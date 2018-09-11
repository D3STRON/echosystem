var species =[];
var target =[]
var foods =[]
var poisons = []
var poisonNo =10
var foodNo = 10
var speciesNo =10
function setup()
{
    createCanvas(600,600)
    counter =0
    for(let i =0 ;i< foodNo ;i++)
    {
        foods.push(new Food())
        poisons.push(new Poison())
    }
    for(let i =0 ;i< speciesNo ;i++)
    {
        species.push(new Species(random(height/2),random(width/2)))
    }
}

function draw()
{   
    counter +=1
    background(0)
    if(random(1)<0.02)
    {
        foods.push(new Food())
    }
    if(random(1)<0.007)
    {
        poisons.push(new Poison())
    }
    for(let i=species.length-1 ; i>=0; i--)
    {
        species[i].boundary()
        species[i].behaviors(foods, poisons)
        species[i].show()
        species[i].update()
        if(species[i].dead())
        {
            species.splice(i,1)
        }
    }
    show(foods)
    show(poisons)
}

function show(list)
{
    for(let i = 0 ; i<list.length;i++)
    {
        list[i].show()
    }
}
function reset()
{
    for(let i =0 ;i< foodNo ;i++)
    {
        foods.push(new Food())
        poisons.push(new Poison())
    }
}