export class Location {
  constructor(name, neighborhood, infestationDefault, nextDoor) {
    this.name = name;
    this.neighborhood = neighborhood;
    this.infestationDefault = infestationDefault;
    this.nextDoor = nextDoor;
    this.infestationAmounts = {"Mini Mammoths": 0, "Safety Cones": 0, "Tiny Velociraptors": 0, "Tribbles": 0};
  }

  infest(infestation) {
    if (this.infestationAmounts[infestation] < 3) {
      this.infestationAmounts[infestation] += 1;
    } else {
      // Outbreak!
      this.nextDoor.forEach(function(location) {
        location.infest(infestation);
      });
    }
  }
}
