var canvas, backgroundimage;
var gameState = 1;
var playerCount;
var database;
var form, player, game;
var allPlayers;
var distance = 0;

function setup() {
  canvas = createCanvas(400, 400);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  game.update(gameState);
}

function draw() {
  if (playerCount === 4) {
    game.update(2);
  }
  if (gameState === 2) {
    clear();
    game.play();
  }
}
