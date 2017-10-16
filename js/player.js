export class Player {
  constructor() {
    this.location = null;
  }

  move(destination) {
    if(this.location.nextDoor.includes(destination)) {
      this.location = destination;
      return true;
    } else {
      return false;
    }
  }


}
