import { Location } from './../js/location.js';

describe('Location', function() {
  let location;
  beforeEach(function(){
    location = new Location("Epicodus", "Downtown", "Tiny Velociraptors", ["Pike Place", "Library"]);
  });

  it('initalizes infestation amounts to zero for each', function(){
    expect(location.infestationAmounts).toEqual({"Mini Mammoths": 0, "Safety Cones": 0, "Tiny Velociraptors": 0, "Tribbles": 0});
  });

  describe("infest", function() {
    it("adds one to a location's infestation amount for the given infestation", function() {
      location.infest("Tiny Velociraptors");
      expect(location.infestationAmounts).toEqual({"Mini Mammoths": 0, "Safety Cones": 0, "Tiny Velociraptors": 1, "Tribbles": 0});
    });

    it("infests all neighboring locations if location infestation amount exceeds 3", function() {
      let location2 = new Location("Pike Place", "Downtown", "Tiny Velociraptors", [location]);
      location.nextDoor = [location2];
      location.infestationAmounts["Tiny Velociraptors"] = 3;
      location.infest("Tiny Velociraptors");
      expect(location.infestationAmounts).toEqual({"Mini Mammoths": 0, "Safety Cones": 0, "Tiny Velociraptors": 3, "Tribbles": 0});
      expect(location2.infestationAmounts).toEqual({"Mini Mammoths": 0, "Safety Cones": 0, "Tiny Velociraptors": 1, "Tribbles": 0});
    });
  });
});
