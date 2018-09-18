class Species{
    
    constructor(x,y , dna)
    {
        this.location = new Vector([x,y])
        this.accleration = new Vector([0,0])
        this.velocity = new Vector([0,-1])
        this.maxforce = 0.07
        this.rad = 8  
        this.maxspeed = 4
        this.compression = 0.9
        this.detectRadius = 20
        this.health =1
        this.mutation_rate = 0.5
        if(dna)
        {
            this.dna=[]
            this.dna[0] = this.mutate(dna[0], 0.1)
            this.dna[1] = this.mutate(dna[1], 0.1)
            this.dna[2] = this.mutate(dna[2], 0.1)
            this.dna[3] = this.mutate(dna[3], 10)
            this.dna[4] = this.mutate(dna[4], 10)
            this.dna[5] = this.mutate(dna[5], 10)
        }
        else{
            this.dna = [ random(-1,1),random(-1,1), random(-1,1),random(0,150),random(0,150),random(0,150)]
        }
    }
    
    mutate(dna,lim)
    {
        if(random(1)<this.mutation_rate)
        {
            return dna + random(-1*lim, lim)
        }
        return dna
    }

    clone()
    {
        if(random(0,1)<0.003 && this.health>0.8)
        {
            return new Species(this.location.values[0] , this.location.values[1], this.dna)
        }
        return null
    }
    update()
    {
        this.health -= 0.002
        this.velocity.add(this.accleration)
        this.velocity.limit(this.maxspeed)
        this.location.add(this.velocity)
        this.accleration.multiply(0)
    }

    behaviors(good , bad, avoid)
    {
        //find species steering forces towards nearest food and poison saperately
        var steerG = this.descide(good , this.dna[3], 0.3)
        var steerB = this.descide(bad ,  this.dna[4], -0.2)
        var steerP = this.descide(avoid, this.dna[5])
        
        //give them their respective prioritty or importance
        steerG.multiply(this.dna[0])
        steerB.multiply(this.dna[1])
        steerP.multiply(this.dna[2])
        
        // add them to their accleration
        this.accleration.add(steerG)
        this.accleration.add(steerB)
        this.accleration.add(steerP)
    }

    dead()
    {
        return (this.health<0)
    }
   

    descide(list , perception, nutrition)
    {
        let min = Infinity
        let index = null
        // when there are chances of slicing the list its better to move backward as the index of the upcoming elements remain the same
        for(let i =list.length-1 ; i>=0; i--)
        {
            var dist = Vector.sub(list[i].location, this.location)
            dist = dist.magnitude()
            //All food or poison in the given proximity will be eaten
            if(dist<this.maxspeed && nutrition)
            {
                list.splice(i,1)
                this.health += nutrition
            }
            else if(min >= dist && dist < perception)
            {
                min = dist
                // instead of dealing with index take the object directly
                index = list[i]
            }
        }

        //if we do have a food or poison not in poximity but at minimum distance then seek it
        if(index != null)
        {
            return this.seek(index.location)
        }
        return new Vector([ 0 , 0 ])
    }

    seek(target)
    {
         this.steering = Vector.sub(target, this.location)
         var currentDist = this.steering.magnitude()
         this.steering.normalize()
         this.steering.multiply(this.maxspeed)
         this.steering.sub(this.velocity)
         this.steering.limit(this.maxforce)
         return this.steering
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
        // stroke(0 , 255 , 0)
        // line(0,0, this.dna[0]*30, 0)

        // stroke(255 , 0 , 0)
        // line(0,0, this.dna[1]*30 , 0)
        // noFill()
        // stroke(0 , 255 , 0)
        // ellipse(0,0,this.dna[2])
        // stroke(255, 0 , 0)
        // ellipse(0,0,this.dna[3])

        var grn = color( 0, 255, 0)
        var red = color( 255, 0 ,0)
        var col = lerpColor(red, grn , this.health)
        
        fill(col)
        stroke(col)
        ellipse(0, 0, 2*this.rad*this.compression, this.rad*this.compression)
        rotate(-1*Math.atan(Ratio))
        translate(-1*x,-1*y)
    }
}