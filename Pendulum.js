const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var holder,ball,ground;

function setup() {
  createCanvas(600,500);
  engine = Engine.create();
  world = engine.world;

  var holder_options={
    isStatic: true
  }

holder = Bodies.rectangle(300,20,300,20,holder_options);
World.add(world,holder);

var ball_options = {

  restitution : 1.0,
  density : 1.0

}

ball  = Bodies.circle(10,20,20,ball_options);
World.add(world,ball);


var options = {
  bodyA : ball,
  bodyB : holder,
  stiffness:1,
  length : 300
}
var string = Constraint.create(options);
World.add(world,string);

fill("WHite");
}


function draw() {
  background(250,205,180); 
  Engine.update(engine);

 fill ("brown");
  text("Press space bar to oscillate the pendulam to left and right with mouse",115,400);
  text("Press Enter to release the bob",225,450);

 
rectMode(CENTER);
rect(holder.position.x,holder.position.y,200,20);


fill("black");
ellipseMode(RADIUS);
ellipse(ball.position.x,ball.position.y,20);

strokeWeight(2);
stroke("black");
line(ball.position.x,ball.position.y,holder.position.x,holder.position.y)




if(keyCode===32){
ball.position.y = mouseY;
ball.position.x = mouseX;
}

else if (keyCode === ENTER){
ball.position.x = ball.position.x;

}

}








