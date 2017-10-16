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

  it("creates and stores a location object for each location", function() {
    expect(game.locations[0].name).toEqual('Ravenna Park');
    expect(game.locations[0].neighborhood).toEqual('U-District');
    expect(game.locations[0].infestationDefault).toEqual('Tribbles');
    expect(game.locations[0].nextDoor).toEqual(["Neptune Theater", "Cafe Allegro"]);
  });

  it("stores the status of each neighborhood", function() {
    expect(game.neighborhoodStatus).toEqual({"Frellard": 0, "Capitol Hill": 0, "Downtown": 0, "U-District": 0});
  });
});
