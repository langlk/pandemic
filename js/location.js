export class Location {
  constructor(name, neighborhood, infestationDefault, nextDoor) {
    this.name = name;
    this.neighborhood = neighborhood;
    this.infestationDefault = infestationDefault;
    this.nextDoor = nextDoor;
    this.infestationAmounts = {"Mini Mammoths": 0, "Safety Cones": 0, "Tiny Velociraptors": 0, "Tribbles": 0};
  }
}
