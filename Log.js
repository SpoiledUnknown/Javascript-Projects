class Log
{
    constructor(x,y,width,height,angle)
    {
        var option=
        {
            'restitution':0.8,
            'friction':10000000000.0,
            'density':1.0
        }

        this.body=Bodies.rectangle(x,y,width,height,angle,option);
        this.width=width;
        this.height=height;
        Matter.Body.setAngle(this.body, angle);
        World.add(world,this.body);
    }
    display()
    {
    var pos=this.body.position;
    var angle=this.body.angle;
    push();
    translate(pos.x,pos.y);
    rotate(angle);
    rectMode(CENTER);
    strokeWeight(4);
    stroke("brown");
    fill(255);
    rect(0,0,this.width,this.height);
    pop();
    }
}