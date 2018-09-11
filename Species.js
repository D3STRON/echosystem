class Species{
    
    constructor(x,y , dna)
    {
        this.location = new Vector([x,y])
        this.accleration = new Vector([0,0])
        this.velocity = new Vector([0,-1])
        this.maxforce = 0.07
        this.rad = 10  
        this.maxspeed = 4
        this.compression = 0.9
        this.detectRadius = 20
        this.health =1
        if(z)
        {
            this.dna = z
        }
        else{
            this.dna = [ random(-2,2),random(-2,2),random(0,150),random(0,150) ]
        }
    }
    update()
    {
        this.health -= 0.001 
        this.velocity.add(this.accleration)
        this.velocity.limit(this.maxspeed)
        this.location.add(this.velocity)
        this.accleration.multiply(0)
    }

    behaviors(good , bad)
    {
        //find species steering forces towards nearest food and poison saperately
        var steerG = this.eat(good , 0.1, this.dna[2])
        var steerB = this.eat(bad , -0.1, this.dna[3])
        
        //give them their respective prioritty or importance
        steerG.multiply(this.dna[0])
        steerB.multiply(this.dna[1])
        
        // add them to their accleration
        this.accleration.add(steerG)
        this.accleration.add(steerB)
    }

    dead()
    {
        return (this.health<0)
    }

    eat(list , nutrition , perception)
    {
        let min = Infinity
        let index = null
        // when there are chances of slicing the list its better to move backward as the index of the upcoming elements remain the same
        for(let i =list.length-1 ; i>=0; i--)
        {
            let dist = Math.sqrt( Math.pow( list[i].x - this.location.values[0] , 2 ) + Math.pow( list[i].y - this.location.values[1] , 2 ) )
            //All food or poison in the given proximity will be eaten
            if(dist<this.maxspeed)
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
            return this.seek(new Vector([ index.x , index.y ]))
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
        stroke(0 , 255 , 0)
        line(0,0, this.dna[0]*30, 0)

        stroke(255 , 0 , 0)
        line(0,0, this.dna[1]*30 , 0)
        noFill()
        stroke(0 , 255 , 0)
        ellipse(0,0,this.dna[2])
        stroke(255, 0 , 0)
        ellipse(0,0,this.dna[3])

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