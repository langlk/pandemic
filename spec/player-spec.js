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
      player.location.infestationAmounts["Tribbles"] = 2;
      player.cures["Tribbles"] = true;
      player.treat("Tribbles");
      expect(player.location.infestationAmounts["Tribbles"]).toEqual(0);
    });

    it("marks player as busy for one timeUnit after treating infestation", function() {
      player.location = game.locations["Archie McPhees"];
      player.location.infestationAmounts["Tribbles"] = 2;
      player.treat("Tribbles");
      expect(player.busy).toEqual(true);
      jasmine.clock().tick(15001);
      expect(player.busy).toEqual(false);
    });

    it("does not allow player to treat if the player is busy", function() {
      player.location = game.locations["Archie McPhees"];
      player.location.infestationAmounts["Tribbles"] = 2;
      player.busy = true;
      expect(player.treat("Tribbles")).toEqual(false);
      expect(player.location.infestationAmounts["Tribbles"]).toEqual(2);
    });

    it("marks infestation as treated by player", function() {
      player.location = game.locations["Archie McPhees"];
      player.location.infestationAmounts["Tribbles"] = 2;
      player.treat("Tribbles");
      expect(player.treated["Tribbles"]).toEqual(true);
    })
  });

  describe('cure', function() {
    it('will mark a player as busy for four timeUnits when player is creating a cure.', function() {
      player.treated["Tiny Velociraptors"] = true;
      player.cure("Tiny Velociraptors");
      expect(player.busy).toEqual(true);
      jasmine.clock().tick(60001);
      expect(player.busy).toEqual(false);
    });

    it('does not allow player to cure if the player is marked as busy', function() {
      player.treated["Tiny Velociraptors"] = true;
      player.busy = true;
      expect(player.cure("Tiny Velociraptors")).toEqual(false);
    });

    it("does not allow player to cure infestation outside of that infestation's neighborhood.", function() {
      player.treated["Mini Mammoths"] = true;
      expect(player.cure("Mini Mammoths")).toEqual(false);
      expect(player.cures).toEqual({"Mini Mammoths": false, "Safety Cones": false, "Tiny Velociraptors": false, "Tribbles": false});
    });

    it("does not allow a player to cure an infestation until they have treated it once", function() {
      expect(player.cure("Tiny Velociraptors")).toEqual(false);
      expect(player.cures).toEqual({"Mini Mammoths": false, "Safety Cones": false, "Tiny Velociraptors": false, "Tribbles": false});
    });
  });




});
