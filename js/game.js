import { Infestation } from './../js/infestation.js';
import { Location } from './../js/location.js';
import { Player } from './../js/player.js';


export class Game {
  constructor(timeUnit){
    this.timeUnit = timeUnit;
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
      "Volunteer Park": ["Capitol Hill", "College Inn", "Century Ballroom", "Julia's"],
      "Sizzle Pie": ["Capitol Hill", "Mercury", "Century Ballroom"],
      "Mercury": ["Capitol Hill", "Sizzle Pie", "Century Ballroom"],
      "Century Ballroom": ["Capitol Hill", "Sizzle Pie", "Mercury", "Volunteer Park", "Julia's"],
      "Julia's": ["Capitol Hill", "Volunteer Park", "Century Ballroom", "Convention Center"],
      "Convention Center": ["Downtown", "Julia's", "Pike Place", "Central Library", "Space Needle"],
      "Central Library": ["Downtown", "Convention Center", "Epicodus"],
      "Epicodus": ["Downtown", "Library", "Pike Place"],
      "Pike Place": ["Downtown", "Epicodus", "Convention Center", "Space Needle"],
      "Space Needle": ["Downtown", "Pike Place", "Convention Center", "Lenin"],
      "Lenin": ["Frellard", "Space Needle", "Ballard Locks", "Fremont Troll", "Gasworks"],
      "Gasworks": ["Frellard", "Lenin", "Archie McPhees"],
      "Ballard Locks": ["Frellard", "Lenin", "Fremont Troll"],
      "Fremont Troll": ["Frellard", "Ballard Locks", "Lenin", "Gasworks", "Archie McPhees"],
      "Archie McPhees": ["Frellard", "Fremont Troll", "Neptune Theater"]};
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
    setInterval(() => {
      for (let i = 0; i < this.infestationRate; i++){
        let location = this.locationDraw.shift();
        location.infest(location.infestationDefault);
        this.locationDiscard.unshift(location);
      }
    }, this.timeUnit * 4);

  }

  epidemic(mode) {
    setInterval(() =>  {
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
    
  }

  neighborhoodOverrun() {

  }

  isOver() {
    // callback
    let checkInterval = setInterval(() => {
      if (this.win()) {
        this.outcome =  "Win!";
        endGame();
      } else if (this.neighborhoodOverrun()) {
        this.outcome = `Loss: ${this.neighborhoodOverrun()} was overrun.`;
        endGame();
      }
    }, this.timeUnit);
  }

  endGame() {
    //clear spread, epidemic, and isOver intervals

  }
}
