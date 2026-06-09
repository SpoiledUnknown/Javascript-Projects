class Game {
  constructor() {}

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state,
    });
  }
  start() {
    if (gameState === 1) {
      player = new Player();
      player.getCount();
      form = new Form();
      form.display();
    }
  }
  play() {
    form.hide();
    textSize(30);
    text("game start", 120, 100);
    Player.getPlayerinfo();
    if (allPlayers !== undefined) {
      var display_position = 130;
      display_position += 20;
      for (var plr in allPlayers) {
        if (plr === "player" + player.index) {
          fill("red");
        } else {
          fill("black");
        }
      }
      textSize(15);
      text(
        allPlayers[plr].name + " :" + allPlayers[plr].distance,
        120,
        display_position
      );
    }
    if (keyIsDown(UP_ARROW) && player.index != null) {
      player.distance += 50;
      player.update();
    }
  }
}
