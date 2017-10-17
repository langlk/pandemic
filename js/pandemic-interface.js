import { Game } from './../js/game.js';

function IDify(string) {
  string = string.split(" ").join("-");
  return string;
}

$(document).ready(function() {
  const game = new Game(15000);
  Object.keys(game.locations).forEach(function(name) {
    $('.locations').append(`<li id=${IDify(name)}>${name}</li>`);
  });

  $('#game-start').click(function() {
    game.start();
    console.log(game);
    Object.keys(game.locations).forEach(function(name) {
      let location = game.locations[name];
      Object.keys(location.infestationAmounts).forEach(function(infestation) {
        $(`#${IDify(name)}`).append(`${infestation}: ${location.infestationAmounts[infestation]} `)
      });
    });
  });
});
