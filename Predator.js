class Predator{
    constructor(x,y , dna)
    {
        this.velocity= new Vector([ 0, -1])
        this.accleration = new Vector([ 0, 0])
        this.location = new Vector([ x, y])
        this.maxspeed = 2
        this.rad =13
        this.maxforce = 0.07
        this.compression = 0.9
        this.dna = [ random(-1,1), random(-1,1), random(0,50), random(0,50)]
    }
   
    behaviors(Sp, Fo)
    {
        var steerSp = this.eat(Sp, 0.3, this.dna[2])
        var steerFo = this.eat(Fo, 0.1, this.dna[3])
    }

    eat(list, nutrition, perception)
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

    update()
    {
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
        // stroke(0 , 255 , 0)
        // line(0,0, this.dna[0]*30, 0)

        // stroke(255 , 0 , 0)
        // line(0,0, this.dna[1]*30 , 0)
        // noFill()
        // stroke(0 , 255 , 0)
        // ellipse(0,0,this.dna[2])
        // stroke(255, 0 , 0)
        // ellipse(0,0,this.dna[3])
        var col = 255
        
        fill(col)
        stroke(col)
        ellipse(0, this.rad-7, 0.5*this.rad*this.compression, this.rad*this.compression)
        ellipse(0, -1*(this.rad-7), 0.5*this.rad*this.compression, this.rad*this.compression)
        ellipse(0, 0, this.rad, this.rad*0.8)
        rotate(-1*Math.atan(Ratio))
        translate(-1*x,-1*y)
    }

}