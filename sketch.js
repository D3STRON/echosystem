var species =[];
var target =[]
var foods =[]
var poisons = []
function setup()
{
    createCanvas(800,600)
    counter =0
    for(let i =0 ;i< 10 ;i++)
    {
        foods.push(new Food())
        poisons.push(new Poison())
    }
    for(let i =0 ;i< 10 ;i++)
    {
        species.push(new Species(random(height/2),random(width/2)))
    }
}

function draw()
{   
    counter +=1
    background(0)
    if(random(1)<0.03)
    {
        foods.push(new Food())
    }
    for(let i=0 ; i<species.length; i++)
    {
        stroke(255)
        species[i].behaviors(foods, poisons)
        species[i].show()
        species[i].update()
        if(species[i].dead())
        {
            species.splice(i,1)
        }
    }
}


function reset()
{
    for(let i =0 ;i< 10 ;i++)
    {
        foods.push(new Food())
        poisons.push(new Poison())
    }
}