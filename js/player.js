export class Player {
  constructor(startLocation, timeUnit) {
    this.busy = false;
    this.location = startLocation;
    this.treated = {"Mini Mammoths": false, "Safety Cones": false, "Tiny Velociraptors": false, "Tribbles": false};
    this.cures = {"Mini Mammoths": false, "Safety Cones": false, "Tiny Velociraptors": false, "Tribbles": false};
    this.timeUnit = timeUnit;
  }

  move(destination) {
    if(this.busy) {
      return false;
    } else {
      if(this.location.nextDoor.includes(destination)) {
        this.location = destination;
        this.busy = true;
        setTimeout(() => {
          this.busy = false;
        }, this.timeUnit);
        return true;
      } else {
        return false;
      }
    }
  }

  treat(infestation) {
    if(this.busy) {
      return false;
    } else {
      if(this.location.infestationAmounts[infestation] > 0) {
        if(this.cures[infestation]) {
          this.location.infestationAmounts[infestation] = 0;
        } else {
          this.location.infestationAmounts[infestation] -= 1;
        }
        this.treated[infestation] = true;
        this.busy = true;
        setTimeout(() => {
          this.busy = false;
        }, this.timeUnit);
        return true;
      } else {
        return false;
      }
    }
  }

  cure(infestation) {
    if(this.busy) {
      return false;
    } else {
      if (this.location.infestationDefault === infestation && this.treated[infestation]) {
        this.cures[infestation] = true;
        this.busy = true;
        setTimeout(() => {
          this.busy = false;
        }, this.timeUnit * 4);
      } else {
        return false;
      }
    }
  }
}
