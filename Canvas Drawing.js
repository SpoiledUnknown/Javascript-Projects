
var drawing=[];
var currentPath=[];
var isdrawing=false;

function setup()
{
    canvas=createCanvas(1000,500);
    canvas.mousePressed(startPath);
    canvas.mouseReleased(endPath);

    
    
    initial=createInput('Set Stroke Weight');
    initial.position(50,60)
    button=createButton('SET');
    button.position(180,90);
    button.mousePressed(changeweight);

    filling=createInput('Set Color')
    filling.position(50,150);
    button2=createButton('SET');
    button2.position(180,180);
    button2.mousePressed(changeColor);
} 


function draw()
{
    background(0);

    if(isdrawing===true)
    {
        var point={
            x:mouseX,
            y:mouseY
        }
        currentPath.push(point);
    }

    noFill();
    for(i=0;i<drawing.length;i++)
    {
        var point = drawing[i];

        beginShape();
        for(j=0;j<point.length;j++)
        {
            vertex(point[j].x,point[j].y);
        }
        endShape();

    }
    
}

function startPath()
{
    isdrawing=true;
    currentPath=[];
    drawing.push(currentPath);
}


function endPath()
{
    isdrawing=false;
}

function changeweight()
{
    strokeWeight(initial.value());
}

function changeColor()
{
    stroke(filling.value());

}