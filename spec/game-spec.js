import { Game } from './../js/game.js';

describe("Game", function() {
  let game;

  beforeEach(function() {
    jasmine.clock().install();
    game = new Game(15000);
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it("creates and stores an infestation object for each infestation", function() {
    expect(game.infestations[0].name).toEqual('Mini Mammoths');
    expect(game.infestations[0].neighborhood).toEqual('Frellard');
  });

  it("creates and stores a location object for each location", function() {
    expect(game.locations['Ravenna Park'].name).toEqual('Ravenna Park');
    expect(game.locations['Ravenna Park'].neighborhood).toEqual('U-District');
    expect(game.locations['Ravenna Park'].infestationDefault).toEqual('Tribbles');
  });

  it("stores each location's nextDoor locations", function() {
    expect(game.locations['Archie McPhees'].nextDoor).toEqual([game.locations['Fremont Troll'], game.locations['Neptune Theater']]);
  });

  it("stores the status of each neighborhood", function() {
    expect(game.neighborhoodStatus).toEqual({"Frellard": 0, "Capitol Hill": 0, "Downtown": 0, "U-District": 0});
  });

  describe("spread", function() {
    it("adds one default infestation to each of the locations drawn.", function() {
      game.spread();
      jasmine.clock().tick(60001);
      expect(game.locations["Ravenna Park"].infestationAmounts).toEqual({"Mini Mammoths": 0, "Safety Cones": 0, "Tiny Velociraptors": 0, "Tribbles": 1});
      expect(game.locations["Neptune Theater"].infestationAmounts).toEqual({"Mini Mammoths": 0, "Safety Cones": 0, "Tiny Velociraptors": 0, "Tribbles": 1});
    });

    it("removes locations from draw pile and adds them to the discard pile", function() {
      game.spread();
      jasmine.clock().tick(60001);
      expect(game.locationDraw.length).toEqual(18);
      expect(game.locationDiscard.length).toEqual(2);
    });
  });

  describe('epidemic', function() {
    it('increases infestation rate by one', function() {
      game.epidemic("test");
      jasmine.clock().tick(60001);
      expect(game.infestationRate).toEqual(3);
    });

    it('adds 3 infestation units to drawn location card', function() {
      game.epidemic("test");
      jasmine.clock().tick(60001);
      expect(game.locations["Archie McPhees"].infestationAmounts).toEqual({"Mini Mammoths": 3, "Safety Cones": 0, "Tiny Velociraptors": 0, "Tribbles": 0});
    });

    it('moves all locations back to location draw pile', function() {
      game.epidemic("test");
      jasmine.clock().tick(60001);
      expect(game.locationDraw.length).toEqual(20);
      expect(game.locationDiscard.length).toEqual(0);
    });
  });

  describe('start', function() {
    it('starts clock on spread intervals', function() {
      game.start();
      jasmine.clock().tick(60001);
      expect(game.locationDraw.length).toEqual(15);
      expect(game.locationDiscard.length).toEqual(5);
    });
  });
});
