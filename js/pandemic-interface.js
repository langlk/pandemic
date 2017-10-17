import { Game } from './../js/game.js';

function IDify(string) {
  string = string.split(" ").join("-");
  return string;
}

$(document).ready(function() {
  const game = new Game(15000);
  Object.keys(game.locations).forEach(function(name) {
    $('.locations').append(`<li id=${IDify(name)}>${name}<div class="options"> </div></li>`);
  });

  $('#game-start').click(function() {
    game.start();
    console.log(game);
    // Show infestation amounts for each location
    Object.keys(game.locations).forEach(function(name) {
      let location = game.locations[name];
      $(`#${IDify(name)}`).append(`<ul></ul>`);
      Object.keys(location.infestationAmounts).forEach(function(infestation) {
        if(location.infestationAmounts[infestation] > 0) {
          $(`#${IDify(name)} ul`).append(`<li>${infestation}: ${location.infestationAmounts[infestation]}</li>`)
        }
      });
    });
    let playerLocation = game.player.location;
    // Highlight player location
    $(`#${IDify(playerLocation.name)}`).addClass("player-location");
    // Add Move option to next door locations
    playerLocation.nextDoor.forEach(function(location) {
      $(`#${IDify(location.name)} .options`).append(`<button type="button" id="move-${IDify(location.name)}">Move</button>`);
    });
    // Create Cure button for player location
    let disabled = "disabled";
    if (game.player.treated[playerLocation.infestationDefault]) {
      disabled = null;
    }
    $(`#${IDify(playerLocation.name)} .options`).append(`<button type="button" id="cure" ${disabled}>Cure ${playerLocation.infestationDefault}</button>`);
    // Create Treat button for any present infestations
    Object.keys(playerLocation.infestationAmounts).forEach(function(infestation) {
      if (playerLocation.infestationAmounts[infestation] > 0) {
        $(`#${IDify(playerLocation.name)} .options`).append(`<button type="button" id="treat-${IDify(infestation)}">Treat ${infestation}</button>`);
      }
    })
  });
});
