//showing all game object of game
var trex, trexRunning, trexCollided, ground, img, invisibleGround;

var obstacleGroup,
  obstacle1,
  obstacle2,
  obstacle3,
  obstacle4,
  obstacle5,
  obstacle6;

var cloudsGroup, cloudImg;

var gameOver, resetButtun, gameOverImg, resetButtunImg;

let isGround = false;

var count = 0;

var play = 1;

var end = 0;

var gameState = play;

function preload() {
  //set animation to trex runner
  trexRunning = loadAnimation("trex1.png", "trex3.png", "trex4.png");

  //set animation to trex collided
  trexCollided = loadImage("trex_collided.png");

  //set image to ground
  img = loadImage("ground2.png");

  //set image to obstacle
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  //set image to obstacle
  cloudImg = loadImage("cloud.png");

  //set image to resetbuttun
  resetButtunImg = loadImage("restart.png");

  //set image to game over
  gameOverImg = loadImage("gameOver.png");
}

function setup() {
  //create canvas
  createCanvas(600, 200);

  //create trex
  trex = createSprite(50, 180, 20, 90);

  //set animatuion and scale to trex
  trex.addAnimation("runner", trexRunning);
  trex.scale = 0.5;

  //create ground,add image and scale
  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", img);

  //create invisible ground
  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  obstacleGroup = new Group();
  cloudsGroup = new Group();

  gameOver = createSprite(300, 100);
  gameOver.addImage("lul", gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  resetButtun = createSprite(300, 140);
  resetButtun.addImage("sft", resetButtunImg);
  resetButtun.scale = 0.5;
  resetButtun.visible = false;
  //trex.debug=true;

  trex.setCollider("circle", 0, 0, 20);
}

function draw() {
  //clear background
  background(180);
  frameRate(60);

  text("Score: " + count, 500, 50);

  if (gameState === play) {
    count = count + Math.round(getFrameRate() / 120);

    ground.velocityX = -(6 + (3 * count) / 100);
    //reset the ground
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    //make trex jump when space is pressed
    if (keyDown("SPACE") && isGround) {
      trex.velocityY = -12;
    }
    //make gravity
    trex.velocityY = trex.velocityY + 0.8;

    spawnObstacles();

    spawnClouds();

    if (trex.isTouching(obstacleGroup)) {
      gameState = end;
    }
  } else if (gameState === end) {
    trex.addAnimation("trex_collided", trexCollided);
    ground.velocityX = 0;
    gameOver.visible = true;
    resetButtun.visible = true;
    obstacleGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    trex.velocityX = 0;
    trex.velocityY = 0;
  }

  if (
    mousePressedOver(resetButtun) ||
    (keyDown("space") && gameState === end)
  ) {
    gameOver.visible = false;
    resetButtun.visible = false;
    reset();
    gameState = play;
  }
  trex.collide(obstacleGroup);

  //draw srpites
  drawSprites();

  //make trex collide invisible ground
  if (trex.collide(invisibleGround)) {
    isGround = true;
  } else {
    isGround = false;
  }
}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, 165, 10, 40);

    obstacle.velocityX = -(6 + (3 * count) / 100);

    //generate random obstacles
    var rand = Math.round(random(1, 6));

    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1);
        break;

      case 2:
        obstacle.addImage(obstacle2);
        break;

      case 3:
        obstacle.addImage(obstacle3);
        break;

      case 4:
        obstacle.addImage(obstacle4);
        break;

      case 5:
        obstacle.addImage(obstacle5);
        break;

      case 6:
        obstacle.addImage(obstacle6);
        break;

      default:
        break;
    }

    //assign scale and lifetime to the obstacle
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
    //obstacle.debug=true;
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600, 120, 40, 10);
    cloud.y = random(280, 320);
    cloud.addImage("cloud", cloudImg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;

    //assign lifetime to the variable
    cloud.lifetime = 240;

    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;

    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}

function reset() {
  count = 0;
  trex.x = 90;
  trex.y = 20;
  trex.addAnimation("trex_running", trexRunning);
  obstacleGroup.destroyEach();
  cloudsGroup.destroyEach();
}
