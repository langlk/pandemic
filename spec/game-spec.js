import { Game } from './../js/game.js';

describe("Game", function() {
  let game;

  beforeEach(function() {
    game = new Game();
  });

  it("creates and stores an infestation object for each infestation", function() {
    expect(game.infestations[0].name).toEqual('Mini Mammoths');
    expect(game.infestations[0].neighborhood).toEqual('Frellard');
  });
});
