import { Player } from './../js/player.js';
import { Game } from './../js/game.js';

describe('player', function() {
  let player;
  let game;

  beforeEach(function() {
    jasmine.clock().install();
    game = new Game(15000);
    player = new Player(game.locations["Epicodus"], 15000);
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  describe('move', function() {
    it('allows player to move location if location is nextDoor to original location', function() {
      player.location = game.locations["Archie McPhees"];
      expect(player.move(game.locations["Fremont Troll"])).toEqual(true);
      expect(player.location).toEqual(game.locations["Fremont Troll"]);
    });

    it('does not allow player to move if location is not nextDoor to original location', function() {
      player.location = game.locations["Archie McPhees"];
      expect(player.move(game.locations["Central Library"])).toEqual(false);
      expect(player.location).toEqual(game.locations["Archie McPhees"]);
    });

    it('will mark player as busy for one timeUnit', function() {
      player.location = game.locations["Archie McPhees"];
      player.move(game.locations["Fremont Troll"]);
      expect(player.busy).toEqual(true);
      jasmine.clock().tick(15001);
      expect(player.busy).toEqual(false);
    });

    it('does not allow player to move when they are busy', function() {
      player.location = game.locations["Archie McPhees"];
      player.busy = true;
      expect(player.move(game.locations["Fremont Troll"])).toEqual(false);
      expect(player.location).toEqual(game.locations["Archie McPhees"]);
    })

  });

  describe('treat', function() {
    it("allows player to remove one infestation unit from their location", function() {
      player.location = game.locations["Archie McPhees"];
      player.location.infestationAmounts["Tribbles"] = 2;
      player.treat("Tribbles");
      expect(player.location.infestationAmounts["Tribbles"]).toEqual(1);
    });

    it("does allow a player to treat an infestation that is at level zero", function() {
      player.location = game.locations["Archie McPhees"];
      expect(player.treat("Tribbles")).toEqual(false);
    });

    it("fully removes infestation if the player knows cure", function() {
      player.location = game.locations["Archie McPhees"];
      player.cures["Tribbles"] = true;
      player.treat("Tribbles");
      expect(player.location.infestationAmounts["Tribbles"]).toEqual(0);
    });
  });



});
