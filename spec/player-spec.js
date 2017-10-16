import { Player } from './../js/player.js';
import { Game } from './../js/game.js';

describe('player', function() {
  let player;
  let game;
  beforeEach(function() {
    player = new Player();
    game = new Game();
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
