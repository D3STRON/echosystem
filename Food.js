class Food{
    constructor(x,y)
    {
        if(x && y)
        {
            this.location = new Vector([x, y])   
        }
        else{
            this.location = new Vector ([random(10,height -10), random(10, width - 10)])
        }
        this.rad = 5
    }
    show()
    {
        stroke(0,255,0)
        fill(color(0, 255, 0))
        ellipse(this.location.values[0], this.location.values[1], this.rad, this.rad)
    }
    update()
    {
        //this.rad -= 0.01
    }
}