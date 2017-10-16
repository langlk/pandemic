import { Location } from './../js/location.js';

describe('Location', function() {
  let location;
  beforeEach(function(){
    location = new Location("Epicodus", "Downtown", "Tiny Velociraptors", ["Pike Place", "Library"]);
  });

  it('initalizes infestation amounts to zero for each', function(){
    expect(location.infestationAmounts).toEqual({"Mini Mammoths": 0, "Safety Cones": 0, "Tiny Velociraptors": 0, "Tribbles": 0});
  });

});
