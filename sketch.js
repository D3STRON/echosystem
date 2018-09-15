var species =[];
var target =[]
var foods =[]
var poisons = []
var poisonNo =10
var foodNo = 50
var speciesNo =20
var predators = [] 
var savedSpecies
function setup()
{
    createCanvas(600,600)
    counter =0
    for(let i =0 ;i< foodNo ;i++)
    {
        foods.push(new Food())
        poisons.push(new Poison())
    }
    predators.push(new Predator(random(height/2),random(width/2)))
    predators.push(new Predator(random(height/2),random(width/2)))
    for(let i =0 ;i< speciesNo ;i++)
    {
        species.push(new Species(random(height/2),random(width/2)))
    }
}

function draw()
{   
    counter +=1
    background(0)
    if(random(1)<0.05)
    {
        foods.push(new Food())
    }
    if(random(1)<0.005)
    {
        poisons.push(new Poison())
    }
    for(let i=species.length-1 ; i>=0; i--)
    {
        species[i].boundary()
        species[i].behaviors(foods, poisons, predators)
        species[i].show()
        species[i].update()
        //cloning is done before splicing to ensure that clone is not done on spiced object
        let newSpecies = species[i].clone()
        if(newSpecies != null)
        {
            species.push(newSpecies)
        }
        if(species[i].dead())
        {
            foods.push(new Food(species[i].location.values[0], species[i].location.values[1]))
            species.splice(i,1)
        }
    }
    for( let i = predators.length-1; i>=0 ;i--)
    {
        predators[i].think(foods, species)
        predators[i].show()
        predators[i].boundary()
        predators[i].update()
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