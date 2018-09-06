class Species{
    
    constructor(x,y)
    {
        this.location = new Vector([x,y])
        this.accleration = new Vector([0,0])
        this.velocity = new Vector([0,-1])
        this.maxforce = 0.04
        this.rad = 10  
        this.maxspeed = 3
        this.compression = 0.9
        this.slowingRadius = 20
        this.health =1
        this.dna = [ random(-5,5),random(-5,5) ]
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
        var steerG = this.eat(good , 0.1)
        var steerB = this.eat(bad , -0.1)
        
        steerG.multiply(this.dna[0])
        steerB.multiply(this.dna[1])
        
        this.accleration.add(steerG)
        this.accleration.add(steerB)
    }

    dead()
    {
        return (this.health<0)
    }

    eat(list , nutrition)
    {
        let min = Infinity
        let index = null
        for(let i =0 ; i<list.length; i++)
        {
            let dist = Math.sqrt( Math.pow( list[i].x - this.location.values[0] , 2 ) + Math.pow( list[i].y - this.location.values[1] , 2 ) )
            if(min >= dist)
            {
                min = dist
                index = i
            }
            list[i].show()
        }
        if(min<5)
        {
            list.splice(index,1)
            this.health += nutrition
        }
        else if(index != null)
        {
            return this.seek(new Vector([ list[index].x , list[index].y ]))
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

    flee(target)
    {
         this.steering = Vector.sub(this.location, target)
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
        // stroke(0 , 255 , 0)
        // line(0,0,0, this.dna[0]*30)

        // stroke(255 , 0 , 0)
        // line(0,0,0, this.dna[1]*30)
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