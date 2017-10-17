import { Game } from './../js/game.js';

const timeUnit = 1000;

function IDify(string) {
  string = string.split(" ").join("-");
  return string;
}

function clearUI() {
  $(".options").html("");
  $("ul ul").html("");
  $(".player-location").removeClass("player-location");
}

function updateUI(game) {
  let busy = null;
  if (game.player.busy) {
    busy = "disabled"
  }
  console.log(game);
  clearUI();
  // Show infestation amounts for each location
  Object.keys(game.locations).forEach(function(name) {
    let location = game.locations[name];
    Object.keys(location.infestationAmounts).forEach(function(infestation) {
      if(location.infestationAmounts[infestation] > 0) {
        $(`#${IDify(name)} ul`).append(`<li>${infestation}: ${location.infestationAmounts[infestation]}</li>`);
      }
    });
  });
  let playerLocation = game.player.location;
  // Highlight player location
  $(`#${IDify(playerLocation.name)}`).addClass("player-location");
  // Add Move option to next door locations
  playerLocation.nextDoor.forEach(function(location) {
    $(`#${IDify(location.name)} .options`).append(`<button type="button" id="move-${IDify(location.name)}" ${busy}>Move</button>`);
    $(`#move-${IDify(location.name)}`).click(function() {
      game.player.move(location);
      updateUI(game);
    });
  });
  // Create Cure button for player location
  let disabled = "disabled";
  if (game.player.treated[playerLocation.infestationDefault] && !game.player.busy) {
    disabled = null;
  }
  $(`#${IDify(playerLocation.name)} .options`).append(`<button type="button" id="cure" ${disabled}>Cure ${playerLocation.infestationDefault}</button>`);
  $(`#cure`).click(function() {
    game.player.cure(playerLocation.infestationDefault);
    updateUI(game);
  });
  // Create Treat button for any present infestations
  Object.keys(playerLocation.infestationAmounts).forEach(function(infestation) {
    if (playerLocation.infestationAmounts[infestation] > 0) {
      $(`#${IDify(playerLocation.name)} .options`).append(`<button type="button" id="treat-${IDify(infestation)}" ${busy}>Treat ${infestation}</button>`);
      $(`#treat-${IDify(infestation)}`).click(function() {
        game.player.treat(infestation);
        updateUI(game);
      });

    }
  });
}

$(document).ready(function() {
  const game = new Game(timeUnit);
  Object.keys(game.locations).forEach(function(name) {
    $('.locations').append(`<li id=${IDify(name)}>${name}<div class="options"> </div><ul></ul></li>`);
  });

  $('#game-start').click(function() {
    game.start();
    console.log(game);
    updateUI(game);
    setInterval(function() {
      updateUI(game);
    }, timeUnit);

  });
});
