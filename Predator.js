class Predator{
    constructor(x,y , brain)
    {
        this.velocity= new Vector([ 0, -1])
        this.accleration = new Vector([ 0, 0])
        this.location = new Vector([ x, y])
        this.maxspeed = 2
        this.rad =13
        this.maxforce = 0.07
        this.compression = 0.9
        this.health = 1
        this.mutation_rate = 0.3
        this.decay_rate = 0.002
        this.clone_rate = 0.0007
        if(brain)
        {
            this.brain = brain.copy()
            this.brain.mutate(this.mutation_rate)
        }
        else{
            this.brain = new NeuralNetwork(15, 6, 2)
        }
    }

    clone()
    {
        if(random(0,1)<this.clone_rate && this.health>0.8)
        {
            return new Predator(this.location.values[0] , this.location.values[1], this.brain)
        }
        return null
    }

    behaviors(Foods , Species)
    {
        let sp = this.detect(Species, 0.4)
        let tar = this.detect(Foods, 0.2)
        if(sp && tar)
        {
            let inputs = sp.location.values.concat(sp.accleration.values).concat(sp.velocity.values).concat(tar.location.values).concat(this.location.values).concat(this.accleration.values).concat(this.velocity.values)
            inputs.push(this.health)
            let outputs = this.brain.feedforward(inputs)
            if(outputs.data[0]>outputs.data[1])
            {
                tar = sp
            }
        }
        if(sp || tar)
        {
            if(sp && !tar)
            {
                tar = sp
            }
            this.seek(tar.location)
            this.accleration.add(this.steering)
        }
        
    }

    detect(list, nutrition)
    {
        let min = Infinity
        let object = null
        for(let i = list.length-1 ; i>=0 ;i--)
        {
            var dist = Vector.sub(list[i].location, this.location)
            dist = dist.magnitude()
            if(dist<5)
            {
                list.splice(i,1)
                this.health += nutrition
            }
            else if(min>dist)
            {
                min = dist
                object = list[i]
            }
        }
        return object
    }

    update()
    {
        this.health -= this.decay_rate
        this.velocity.add(this.accleration)
        this.velocity.limit(this.maxspeed)
        this.location.add(this.velocity)
        this.accleration.multiply(0)
    }

    boundary()
    {
        if(this.location.values[0]>width-20 || this.location.values[0]<20)
        {
            this.seek(new Vector([ height/2, width/2 ])) 
            this.accleration.add(this.steering)
        }
        else if(this.location.values[1]>height-20 || this.location.values[1]<20)
        {
            this.seek(new Vector([ height/2, width/2 ]))
            this.accleration.add(this.steering)
        }
    }

    dead()
    {
        return (this.health<0)
    }

    seek(target)
    {
        this.steering = Vector.sub(target , this.location)
        this.steering.normalize()
        this.steering.multiply(this.maxspeed)
        this.steering.sub(this.velocity)
        this.steering.limit(this.maxforce)
        return this.steering 
    }

    show()
    {
        fill(255)
        var x = this.location.values[0]
        var y = this.location.values[1]
        var Ratio = this.velocity.values[1] / this.velocity.values[0]
        translate(x,y)
        rotate(Math.atan(Ratio))
        if(this.rad*this.compression>this.rad/2 && counter % 10 ==0)
        {
            this.compression-= 0.1
        }
        else if(this.rad*this.compression <= this.rad/2)
        {
            this.compression = 0.9
        }
        var grn = color( 0, 255, 0)
        var red = color( 255, 0 ,0)
        var col = lerpColor(red, grn , this.health)
        fill(col)
        stroke(col)
        ellipse(0, this.rad-7, 0.5*this.rad*this.compression, this.rad*this.compression)
        ellipse(0, -1*(this.rad-7), 0.5*this.rad*this.compression, this.rad*this.compression)
        ellipse(0, 0, this.rad, this.rad*0.8)
        rotate(-1*Math.atan(Ratio))
        translate(-1*x,-1*y)
    }

}

/*

behaviors(Sp, Fo)
    {
        var steerSp = this.eat(Sp, 0.3, this.dna[2])
        var steerFo = this.eat(Fo, 0.1, this.dna[3])
    }

    eat(list)
    {
        let min = Infinity
        let object = null
        for(let i = list.length-1 ; i>=0 ;i--)
        {
            var dist = Vector.sub(list[i].location, this.location)
            dist = dist.magnitude()
            if(dist<5)
            {
                savedSpecies = list[i]
                list.splice(i,1)
            }
            else if(min>dist)
            {
                min = dist
                object = list[i]
            }
        }
        if(object != null)
        {
            this.seek(object.location)
            this.accleration.add(this.steering)
        }
    }

*/