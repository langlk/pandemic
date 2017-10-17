(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _infestation = require('./../js/infestation.js');

var _location = require('./../js/location.js');

var _player = require('./../js/player.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = exports.Game = function () {
  function Game(timeUnit) {
    var _this = this;

    _classCallCheck(this, Game);

    this.timeUnit = timeUnit;
    this.spreadInterval;
    this.epidemicInterval;
    this.isOverInterval;
    this.outcome = "Ongoing";
    this.locationDraw = [];
    this.locationDiscard = [];
    this.cures = { "Mini Mammoths": false, "Safety Cones": false, "Tiny Velociraptors": false, "Tribbles": false };
    this.infestationRate = 2;
    var infestationInfo = { "Frellard": "Mini Mammoths", "Capitol Hill": "Safety Cones", "Downtown": "Tiny Velociraptors", "U-District": "Tribbles" };
    this.infestations = [];
    Object.keys(infestationInfo).forEach(function (neighborhood) {
      var infestation = new _infestation.Infestation(infestationInfo[neighborhood], neighborhood);
      _this.infestations.push(infestation);
    });
    this.players = [];
    var locationInfo = {
      "Ravenna Park": ["U-District", "Neptune Theater", "Cafe Allegro"],
      "Neptune Theater": ["U-District", "Ravenna Park", "Cafe Allegro", "Archie McPhees"],
      "Cafe Allegro": ["U-District", "Ravenna Park", "Neptune Theater", "Suzzallo Library", "College Inn"],
      "Suzzallo Library": ["U-District", "Cafe Allegro", "College Inn"],
      "College Inn": ["U-District", "Cafe Allegro", "Suzzallo Library", "Volunteer Park"],
      "Volunteer Park": ["Capitol Hill", "College Inn", "Century Ballroom", "Julias"],
      "Sizzle Pie": ["Capitol Hill", "Mercury", "Century Ballroom"],
      "Mercury": ["Capitol Hill", "Sizzle Pie", "Century Ballroom"],
      "Century Ballroom": ["Capitol Hill", "Sizzle Pie", "Mercury", "Volunteer Park", "Julias"],
      "Julias": ["Capitol Hill", "Volunteer Park", "Century Ballroom", "Convention Center"],
      "Convention Center": ["Downtown", "Julias", "Pike Place", "Central Library", "Space Needle"],
      "Central Library": ["Downtown", "Convention Center", "Epicodus"],
      "Epicodus": ["Downtown", "Central Library", "Pike Place"],
      "Pike Place": ["Downtown", "Epicodus", "Convention Center", "Space Needle"],
      "Space Needle": ["Downtown", "Pike Place", "Convention Center", "Lenin"],
      "Lenin": ["Frellard", "Space Needle", "Ballard Locks", "Fremont Troll", "Gasworks"],
      "Gasworks": ["Frellard", "Lenin", "Archie McPhees"],
      "Ballard Locks": ["Frellard", "Lenin", "Fremont Troll"],
      "Fremont Troll": ["Frellard", "Ballard Locks", "Lenin", "Gasworks", "Archie McPhees"],
      "Archie McPhees": ["Frellard", "Fremont Troll", "Neptune Theater"] };
    this.locations = {};
    Object.keys(locationInfo).forEach(function (name) {
      var neighborhood = locationInfo[name][0];
      var infestationDefault = infestationInfo[neighborhood];
      var nextDoor = locationInfo[name].slice(1);
      var location = new _location.Location(name, neighborhood, infestationDefault, nextDoor);
      _this.locations[name] = location;
      _this.locationDraw.push(location);
    });

    Object.keys(this.locations).forEach(function (name) {
      var location = _this.locations[name];
      // location.nextDoor = ["Fremont Troll", "Neptune Theater"]
      for (var i = 0; i < location.nextDoor.length; i++) {
        location.nextDoor[i] = _this.locations[location.nextDoor[i]];
      }
    });
    // Each time a location hits 3, add 1 to neighborhood status. If status hits 5, game is over. If infestation goes down, remove one from status.
    this.neighborhoodStatus = { "Frellard": 0, "Capitol Hill": 0, "Downtown": 0, "U-District": 0 };
    this.player = new _player.Player(this.locations["Epicodus"], this.timeUnit);
  }

  _createClass(Game, [{
    key: 'spread',
    value: function spread() {
      var _this2 = this;

      this.spreadInterval = setInterval(function () {
        if (_this2.locationDraw.length <= _this2.infestationRate) {
          _this2.locationDiscard = _this2.shuffle(_this2.locationDiscard);
          _this2.locationDraw = _this2.locationDraw.concat(_this2.locationDiscard);
          _this2.locationDiscard = [];
        }
        for (var i = 0; i < _this2.infestationRate; i++) {
          var location = _this2.locationDraw.shift();
          location.infest(location.infestationDefault);
          _this2.locationDiscard.unshift(location);
        }
      }, this.timeUnit * 4);
    }
  }, {
    key: 'epidemic',
    value: function epidemic(mode) {
      var _this3 = this;

      this.epidemicInterval = setInterval(function () {
        if (mode === "test" || Math.floor(Math.random() * 8) === 1) {
          _this3.infestationRate += 1;
          var location = _this3.locationDraw.pop();
          for (var i = 0; i < 3; i++) {
            location.infest(location.infestationDefault);
          }
          _this3.locationDiscard.unshift(location);
          _this3.locationDiscard = _this3.shuffle(_this3.locationDiscard);
          // debugger;
          _this3.locationDraw = _this3.locationDiscard.concat(_this3.locationDraw);
          _this3.locationDiscard = [];
        }
      }, this.timeUnit * 4);
    }
  }, {
    key: 'shuffle',
    value: function shuffle(deck) {
      for (var i = deck.length - 1; i > 0; i -= 1) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
      }
      return deck;
    }
  }, {
    key: 'start',
    value: function start() {
      var _this4 = this;

      this.locationDraw = this.shuffle(this.locationDraw);
      for (var i = 3; i > 0; i--) {
        var location = this.locationDraw.shift();
        for (var j = i; j > 0; j--) {
          location.infest(location.infestationDefault);
        }
        this.locationDiscard.unshift(location);
      }
      this.spread();
      setTimeout(function () {
        _this4.epidemic("game");
        _this4.isOver();
      }, 1000);

      // WTF is wrong here??
      // setInterval(() => {
      //   if (Math.floor(Math.random() * 8) === 1) {
      //     console.log("Epidemic!");
      //     this.epidemic();
      //   }
      //   console.log('starting spread');
      //   debugger;
      //   this.spread();
      //   console.log(this.locationDraw);
      // }, this.timeUnit * 4);
    }
  }, {
    key: 'win',
    value: function win() {
      for (var i = 0; i < 4; i++) {
        var infestationName = this.infestations[i].name;
        if (!this.player.cures[infestationName]) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'neighborhoodOverrun',
    value: function neighborhoodOverrun() {
      var _this5 = this;

      var neighborhoodStatus = { "Frellard": 0, "Capitol Hill": 0, "Downtown": 0, "U-District": 0 };
      var overrunNeighborhood = false;
      Object.keys(this.locations).forEach(function (name) {
        var location = _this5.locations[name];
        for (var i = 0; i < 4; i++) {
          var infestationName = _this5.infestations[i].name;
          if (location.infestationAmounts[infestationName] >= 3) {
            neighborhoodStatus[location.neighborhood] += 1;
            if (neighborhoodStatus[location.neighborhood] >= 5) {
              overrunNeighborhood = location.neighborhood;
            }
          }
        }
      });
      return overrunNeighborhood;
    }
  }, {
    key: 'isOver',
    value: function isOver() {
      var _this6 = this;

      // callback
      this.isOverInterval = setInterval(function () {
        if (_this6.win()) {
          _this6.outcome = "Win!";
          _this6.endGame();
        } else if (_this6.neighborhoodOverrun()) {
          _this6.outcome = 'Loss: ' + _this6.neighborhoodOverrun() + ' was overrun.';
          _this6.endGame();
        }
      }, this.timeUnit);
    }
  }, {
    key: 'endGame',
    value: function endGame() {
      //clear spread, epidemic, and isOver intervals
      clearInterval(this.spreadInterval);
      clearInterval(this.epidemicInterval);
      clearInterval(this.isOverInterval);
    }
  }]);

  return Game;
}();

},{"./../js/infestation.js":2,"./../js/location.js":3,"./../js/player.js":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Infestation = exports.Infestation = function Infestation(name, neighborhood) {
  _classCallCheck(this, Infestation);

  this.name = name;
  this.neighborhood = neighborhood;
  this.cured = false;
};

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Location = exports.Location = function () {
  function Location(name, neighborhood, infestationDefault, nextDoor) {
    _classCallCheck(this, Location);

    this.name = name;
    this.neighborhood = neighborhood;
    this.infestationDefault = infestationDefault;
    this.nextDoor = nextDoor;
    this.infestationAmounts = { "Mini Mammoths": 0, "Safety Cones": 0, "Tiny Velociraptors": 0, "Tribbles": 0 };
  }

  _createClass(Location, [{
    key: "infest",
    value: function infest(infestation) {
      this.infestHelp(infestation, []);
    }
  }, {
    key: "infestHelp",
    value: function infestHelp(infestation, maxed) {
      if (this.infestationAmounts[infestation] < 3) {
        this.infestationAmounts[infestation] += 1;
      } else {
        // Outbreak!
        maxed.push(this);
        this.nextDoor.forEach(function (location) {
          if (!maxed.includes(location)) {
            location.infestHelp(infestation, maxed);
          }
        });
      }
    }
  }]);

  return Location;
}();

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = exports.Player = function () {
  function Player(startLocation, timeUnit) {
    _classCallCheck(this, Player);

    this.busy = false;
    this.location = startLocation;
    this.treated = { "Mini Mammoths": false, "Safety Cones": false, "Tiny Velociraptors": false, "Tribbles": false };
    this.cures = { "Mini Mammoths": false, "Safety Cones": false, "Tiny Velociraptors": false, "Tribbles": false };
    this.timeUnit = timeUnit;
  }

  _createClass(Player, [{
    key: "move",
    value: function move(destination) {
      var _this = this;

      if (this.busy) {
        return false;
      } else {
        if (this.location.nextDoor.includes(destination)) {
          this.location = destination;
          this.busy = true;
          setTimeout(function () {
            _this.busy = false;
          }, this.timeUnit);
          return true;
        } else {
          return false;
        }
      }
    }
  }, {
    key: "treat",
    value: function treat(infestation) {
      var _this2 = this;

      if (this.busy) {
        return false;
      } else {
        if (this.location.infestationAmounts[infestation] > 0) {
          if (this.cures[infestation]) {
            this.location.infestationAmounts[infestation] = 0;
          } else {
            this.location.infestationAmounts[infestation] -= 1;
          }
          this.treated[infestation] = true;
          this.busy = true;
          setTimeout(function () {
            _this2.busy = false;
          }, this.timeUnit);
          return true;
        } else {
          return false;
        }
      }
    }
  }, {
    key: "cure",
    value: function cure(infestation) {
      var _this3 = this;

      if (this.busy) {
        return false;
      } else {
        if (this.location.infestationDefault === infestation && this.treated[infestation] && !this.cures[infestation]) {
          this.cures[infestation] = true;
          this.busy = true;
          setTimeout(function () {
            _this3.busy = false;
          }, this.timeUnit * 4);
        } else {
          return false;
        }
      }
    }
  }]);

  return Player;
}();

},{}],5:[function(require,module,exports){
"use strict";

var _game = require("./../js/game.js");

var timeUnit = 1000;
var startTime = void 0;
var updateInterval = void 0;

function IDify(string) {
  string = string.split(" ").join("-");
  return string;
}

function clearUI() {
  $(".options").html("");
  $("ul ul").html("");
  $(".player-location").removeClass("player-location");
}

function updateUI(game) {
  if (game.outcome === "Win!") {
    $(".outcome").text("Victory! Seattle is Saved!");
    clearInterval(updateInterval);
  } else if (game.outcome !== "Ongoing") {
    $(".outcome").text(game.outcome);
    clearInterval(updateInterval);
  }
  // We want buttons to be disabled if the player is busy
  var busy = null;
  if (game.player.busy) {
    busy = "disabled";
  }
  clearUI();
  // Show infestation amounts for each location
  Object.keys(game.locations).forEach(function (name) {
    var location = game.locations[name];
    Object.keys(location.infestationAmounts).forEach(function (infestation) {
      if (location.infestationAmounts[infestation] > 0) {
        $("#" + IDify(name) + " ul").append("<li>" + infestation + ": " + location.infestationAmounts[infestation] + "</li>");
      }
    });
  });
  var playerLocation = game.player.location;
  // Highlight player location
  $("#" + IDify(playerLocation.name)).addClass("player-location");
  // Add Move option to next door locations
  playerLocation.nextDoor.forEach(function (location) {
    $("#" + IDify(location.name) + " .options").append("<button type=\"button\" id=\"move-" + IDify(location.name) + "\" " + busy + ">Move</button>");
    $("#move-" + IDify(location.name)).click(function () {
      game.player.move(location);
      updateUI(game);
    });
  });
  // Create Cure button for player location
  var disabled = "disabled";
  if (game.player.treated[playerLocation.infestationDefault] && !game.player.busy) {
    disabled = null;
  }
  $("#" + IDify(playerLocation.name) + " .options").append("<button type=\"button\" id=\"cure\" " + disabled + ">Cure " + playerLocation.infestationDefault + "</button>");
  $("#cure").click(function () {
    game.player.cure(playerLocation.infestationDefault);
    updateUI(game);
  });
  // Create Treat button for any present infestations
  Object.keys(playerLocation.infestationAmounts).forEach(function (infestation) {
    if (playerLocation.infestationAmounts[infestation] > 0) {
      $("#" + IDify(playerLocation.name) + " .options").append("<button type=\"button\" id=\"treat-" + IDify(infestation) + "\" " + busy + ">Treat " + infestation + "</button>");
      $("#treat-" + IDify(infestation)).click(function () {
        game.player.treat(infestation);
        updateUI(game);
      });
    }
  });

  $(".clock").text(Math.floor((Date.now() - startTime) / timeUnit) + " Turns");
}

$(document).ready(function () {
  var game = new _game.Game(timeUnit);
  Object.keys(game.locations).forEach(function (name) {
    $('.locations').append("<li id=" + IDify(name) + ">" + name + "<div class=\"options\"> </div><ul></ul></li>");
  });

  $('#game-start').click(function () {
    game.start();
    startTime = Date.now();
    console.log(game);
    updateUI(game);
    updateInterval = setInterval(function () {
      updateUI(game);
    }, timeUnit);
  });
});

},{"./../js/game.js":1}]},{},[5]);
