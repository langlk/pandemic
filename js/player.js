export class Player {
  constructor(startLocation) {
    this.location = startLocation;
    this.cures = {"Mini Mammoths": false, "Safety Cones": false, "Tiny Velociraptors": false, "Tribbles": false};
  }

  move(destination) {
    if(this.location.nextDoor.includes(destination)) {
      this.location = destination;
      return true;
    } else {
      return false;
    }
  }

  treat(infestation) {
    if(this.location.infestationAmounts[infestation] > 0) {
      if(this.cures[infestation]) {
        this.location.infestationAmounts[infestation] = 0;
      } else {
        this.location.infestationAmounts[infestation] -= 1;
      }
      return true;
    } else {
      return false;
    }
  }

  cure(infestation) {
    this.cures[infestation] = true;
  }
}
