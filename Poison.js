class Poison{
    constructor()
    {
        this.y = random(10,height -10)
        this.x = random(10, width - 10)
        this.rad = 5
    }
    show()
    {
        fill(255, 0, 0)
        ellipse(this.x, this.y, this.rad, this.rad)
    }
    update()
    {
        //this.rad -= 0.01
    }
}