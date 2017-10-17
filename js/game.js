import { Infestation } from './../js/infestation.js';
import { Location } from './../js/location.js';
import { Player } from './../js/player.js';


export class Game {
  constructor(timeUnit){
    this.timeUnit = timeUnit;
    this.spreadInterval;
    this.epidemicInterval;
    this.isOverInterval;
    this.outcome = "Ongoing";
    this.locationDraw = [];
    this.locationDiscard = [];
    this.cures = {"Mini Mammoths": false, "Safety Cones": false, "Tiny Velociraptors": false, "Tribbles": false};
    this.infestationRate = 2;
    let infestationInfo = {"Frellard": "Mini Mammoths", "Capitol Hill": "Safety Cones", "Downtown": "Tiny Velociraptors", "U-District": "Tribbles"};
    this.infestations = [];
    Object.keys(infestationInfo).forEach((neighborhood) => {
      let infestation = new Infestation(infestationInfo[neighborhood], neighborhood);
      this.infestations.push(infestation);
    });
    this.players = [];
    let locationInfo = {
      "Ravenna Park": ["U-District", "Neptune Theater", "Cafe Allegro"],
      "Neptune Theater": ["U-District", "Ravenna Park", "Cafe Allegro", "Archie McPhees"],
      "Cafe Allegro": ["U-District", "Ravenna Park", "Neptune Theater", "Suzzallo Library", "College Inn"],
      "Suzzallo Library": ["U-District", "Cafe Allegro", "College Inn"],
      "College Inn": ["U-District", "Cafe Allegro", "Suzzallo Library", "Volunteer Park"],
      "Volunteer Park": ["Capitol Hill", "College Inn", "Century Ballroom", "Julias"],
      "Julias": ["Capitol Hill", "Volunteer Park", "Century Ballroom", "Convention Center"],
      "Sizzle Pie": ["Capitol Hill", "Mercury", "Century Ballroom"],
      "Century Ballroom": ["Capitol Hill", "Sizzle Pie", "Mercury", "Volunteer Park", "Julias"],
      "Mercury": ["Capitol Hill", "Sizzle Pie", "Century Ballroom"],
      "Space Needle": ["Downtown", "Pike Place", "Convention Center", "Lenin"],
      "Pike Place": ["Downtown", "Epicodus", "Convention Center", "Space Needle"],
      "Convention Center": ["Downtown", "Julias", "Pike Place", "Central Library", "Space Needle"],
      "Epicodus": ["Downtown", "Central Library", "Pike Place"],
      "Central Library": ["Downtown", "Convention Center", "Epicodus"],
      "Archie McPhees": ["Frellard", "Fremont Troll", "Neptune Theater"],
      "Fremont Troll": ["Frellard", "Ballard Locks", "Lenin", "Gasworks", "Archie McPhees"],
      "Ballard Locks": ["Frellard", "Lenin", "Fremont Troll"],
      "Gasworks": ["Frellard", "Lenin", "Archie McPhees"],
      "Lenin": ["Frellard", "Space Needle", "Ballard Locks", "Fremont Troll", "Gasworks"]};
    this.locations = {};
    Object.keys(locationInfo).forEach((name) => {
      let neighborhood = locationInfo[name][0];
      let infestationDefault = infestationInfo[neighborhood];
      let nextDoor = locationInfo[name].slice(1);
      let location = new Location(name, neighborhood, infestationDefault, nextDoor);
      this.locations[name] = location;
      this.locationDraw.push(location);
    });

    Object.keys(this.locations).forEach((name) => {
      let location = this.locations[name];
      // location.nextDoor = ["Fremont Troll", "Neptune Theater"]
      for (let i = 0; i < location.nextDoor.length; i++) {
        location.nextDoor[i] = this.locations[location.nextDoor[i]];
      }
    });
    // Each time a location hits 3, add 1 to neighborhood status. If status hits 5, game is over. If infestation goes down, remove one from status.
    this.neighborhoodStatus = {"Frellard": 0, "Capitol Hill": 0, "Downtown": 0, "U-District": 0};
    this.player = new Player(this.locations["Epicodus"], this.timeUnit);
  }

  spread() {
    this.spreadInterval = setInterval(() => {
      if (this.locationDraw.length <= this.infestationRate) {
        this.locationDiscard = this.shuffle(this.locationDiscard);
        this.locationDraw = this.locationDraw.concat(this.locationDiscard);
        this.locationDiscard = [];
      }
      for (let i = 0; i < this.infestationRate; i++){
        let location = this.locationDraw.shift();
        location.infest(location.infestationDefault);
        this.locationDiscard.unshift(location);
      }
    }, this.timeUnit * 4);

  }

  epidemic(mode) {
    this.epidemicInterval = setInterval(() =>  {
      if (mode === "test" || Math.floor(Math.random() * 8) === 1) {
        this.infestationRate += 1;
        let location = this.locationDraw.pop();
        for (let i = 0; i < 3; i++) {
          location.infest(location.infestationDefault);
        }
        this.locationDiscard.unshift(location);
        this.locationDiscard = this.shuffle(this.locationDiscard);
        // debugger;
        this.locationDraw = this.locationDiscard.concat(this.locationDraw);
        this.locationDiscard = [];
      }
    }, this.timeUnit * 4);
  }

  shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i -= 1) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
    }
    return deck;
  }

  start() {
    this.locationDraw = this.shuffle(this.locationDraw);
    for (let i = 3; i > 0; i--) {
      let location = this.locationDraw.shift();
      for (let j = i; j > 0; j--) {
        location.infest(location.infestationDefault);
      }
      this.locationDiscard.unshift(location);
    }
    this.spread();
    setTimeout(() => {
      this.epidemic("game");
      this.isOver();
    }, 1000);

    // WTF is wrong here??
    // setInterval(() => {
    //   if (Math.floor(Math.random() * 8) === 1) {
    //     console.log("Epidemic!");
    //     this.epidemic();
    //   }
    //   console.log('starting spread');
    //   debugger;
    //   this.spread();
    //   console.log(this.locationDraw);
    // }, this.timeUnit * 4);
  }

  win() {
    for (let i = 0; i < 4; i++) {
      let infestationName = this.infestations[i].name;
      if (!this.player.cures[infestationName]) {
        return false;
      }
    }
    return true;
  }

  neighborhoodOverrun() {
    let neighborhoodStatus = {"Frellard": 0, "Capitol Hill": 0, "Downtown": 0, "U-District": 0};
    let overrunNeighborhood = false;
    Object.keys(this.locations).forEach((name) => {
      let location = this.locations[name];
      for (let i = 0; i < 4; i++) {
        let infestationName = this.infestations[i].name;
        if (location.infestationAmounts[infestationName] >= 3) {
          neighborhoodStatus[location.neighborhood] += 1;
          if (neighborhoodStatus[location.neighborhood] >= 5) {
            overrunNeighborhood = location.neighborhood;
          }
        }
      }
    });
    return overrunNeighborhood;
  }

  isOver() {
    // callback
    this.isOverInterval = setInterval(() => {
      if (this.win()) {
        this.outcome =  "Win!";
        this.endGame();
      } else if (this.neighborhoodOverrun()) {
        this.outcome = `Loss: ${this.neighborhoodOverrun()} was overrun.`;
        this.endGame();
      }
    }, this.timeUnit);
  }

  endGame() {
    //clear spread, epidemic, and isOver intervals
    clearInterval(this.spreadInterval);
    clearInterval(this.epidemicInterval);
    clearInterval(this.isOverInterval);
  }
}
