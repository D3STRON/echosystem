class Food{
    constructor(x,y)
    {
        if(x && y)
        {
            this.y = y
            this.x = x   
        }
        else{
            this.y = random(10,height -10)
            this.x = random(10, width - 10)
        }
        this.rad = 5
    }
    show()
    {
        stroke(0,255,0)
        fill(color(0, 255, 0))
        ellipse(this.x, this.y, this.rad, this.rad)
    }
    update()
    {
        //this.rad -= 0.01
    }
}