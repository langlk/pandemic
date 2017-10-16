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
});
