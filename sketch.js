var species =[];
var target =[]
var foods =[]
var poisons = []
var poisonNo =10
var foodNo = 50
var predatorNo = 3
var speciesNo =30
var predators = [] 
var savedPredator
function setup()
{
    createCanvas(600,600)
    counter =0
    for(let i =0 ;i< foodNo ;i++)
    {
        foods.push(new Food())
        poisons.push(new Poison())
    }
    for(let i =0 ; i< predatorNo; i++)
    {
        predators.push(new Predator(random(height/2),random(width/2)))
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
    if(random(1)<0.09)
    {
        foods.push(new Food())
    }
    if(random(1)<0.01)
    {
        poisons.push(new Poison())
    }
    
    showLiving(species, foods, poisons, predators)
    if(predators.length ==0 )
    {
        renew()
    }
    showLiving(predators, foods, species)
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

function showLiving(list,list1, list2, list3 ,saved)
{
    for( let i = list.length-1; i>=0 ;i--)
    {
        list[i].behaviors(list1, list2, list3)
        list[i].show()
        list[i].boundary()
        list[i].update()
        let newItem = list[i].clone()
        if(newItem != null)
        {
            if(list[i] instanceof Predator)
            {
                list[i].health = 0.4
            }
            list.push(newItem)
        }
        if(list[i].dead())
        {
            foods.push(new Food(list[i].location.values[0], list[i].location.values[1]))
            if(list[i] instanceof Predator)
            {
                savedPredator = list[i]
            }
            list.splice(i,1)
        }
    }
}

function renew()
{
    for(let i =0 ; i< predatorNo; i++)
    {
        predators.push(new Predator(random(width) , random(height), savedPredator.brain))
    }
}