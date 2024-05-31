var scl=20;
var food;
var score=0;

function setup()
{
    createCanvas(600,600);

    sna=new snake();

    frameRate(10);
    pickandeat();

    bo1 = createSprite(200, 0, 800, 10);
    bo1.shapeColor="black"

    bo2=createSprite(200,600,800,10);
    bo2.shapeColor="black"

    bo3=createSprite(0,200,10,800);
    bo3.shapeColor="black"

    bo4=createSprite(600,200,10,800);
    bo4.shapeColor="black"
    
}

function pickandeat()
{
    var cols = floor(width/scl);
    var rows = floor(height/scl); 
    
   food=createVector(floor(random(cols)),floor(random(rows)));

   food.mult(scl);
}

function draw()
{
    background(100);
    sna.update();
    sna.display();

    textSize(15);
    text("score:"+score,10,50);
    
    if(sna.death())
    {
        score=0;
        sna.destroy();
        
    }
    
    if(sna.eat(food))
    {
        pickandeat();
        score=score+50;
    }

    fill(255,80,60);
    rect(food.x,food.y,scl,scl);

    drawSprites();
    
}

function keyPressed()
{
    if(keyCode===UP_ARROW)
    {
        sna.dir(0,-1);
    }else if(keyCode===DOWN_ARROW)
    {
        sna.dir(0,1);
    }
    else if(keyCode===LEFT_ARROW)
    {
        sna.dir(-1,0);
    }
    else if(keyCode===RIGHT_ARROW)
    {
        sna.dir(1,0);
    }
}



