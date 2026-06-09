const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1;
var backgroundImg,platform;
var score = 0;

var gameState = "onsling" ;



function preload() {
    //backgroundImg = loadImage("sprites/bg.png");
   
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    
    //log1 = new Box(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    

    //log3 =  new Box(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
   // log4 = new Box(760,120,150, PI/7);
    //log5 = new Box(870,120,150, -PI/7);
    

    bird2 = new Bird(200,50);

    slingshot = new Slingshot(bird2.body,{x:200,y:50});

   

   

}

function draw(){
    
    
        background(0);
    
    
    

  
    Engine.update(engine);

    box1.display();
    box2.display();
    ground.display();
    
    
    //log1.display();

    box3.display();
    box4.display();
    
    
    //log3.display();

    box5.display();
    //log4.display();
    //log5.display();



    bird2.display();
    platform.display();
    slingshot.display();


}
function mouseDragged()
{
    if(gameState!=="launched" )
    {
    Matter.Body.setPosition(bird2.body,{x:mouseX,y:mouseY});
    }
}
function mouseReleased()
{
    slingshot.fly();
    gameState="launched";
} 

function keyPressed()
{
    if(keyCode === 32)
    {
        gameState="onsling"
       slingshot.attach(bird2.body);
    }
}
