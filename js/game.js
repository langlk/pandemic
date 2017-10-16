import { Infestation } from './../js/infestation.js';
import { Location } from './../js/location.js';
// import { Player } from './../js/player.js';


export class Game {
  constructor(){
    this.locationDraw = ["Ravenna Park", "Neptune Theater", "Cafe Allegro", "Suzzallo Library", "College Inn", "Volunteer Park", "Sizzle Pie", "Mercury", "Century Ballroom", "Julia's", "Convention Center", "Central Library", "Epicodus", "Pike Place", "Space Needle", "Lenin", "Gasworks", "Ballard Locks", "Fremont Troll", "Archie McPhees"];
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
    this.locations = [];
    Object.keys(locationInfo).forEach((name) => {
      let neighborhood = locationInfo[name][0];
      let infestationDefault = infestationInfo[neighborhood];
      let nextDoor = locationInfo[name].slice(1);
      let location = new Location(name, neighborhood, infestationDefault, nextDoor);
      this.locations.push(location);
    });
    // Each time a location hits 3, add 1 to neighborhood status. If status hits 5, game is over. If infestation goes down, remove one from status.
    this.neighborhoodStatus = {"Frellard": 0, "Capitol Hill": 0, "Downtown": 0, "U-District": 0};
  }
}
