class Vector{
    constructor(values){
        this.values = values
        this.length = values.length
    }

    magnitude()
    {
        var magnitude =0
        for(let i = 0 ; i< this.values.length;i++)
        {
            magnitude += Math.pow( this.values[i] , 2 )
        }
        return Math.sqrt(magnitude)
    }

    add(B)
    {
        for(let i =0 ;i<B.length;i++)
        {
            this.values[i]+=B.values[i]
        }
    }
    sub(B)
    {
        for(let i =0 ;i<B.length;i++)
        {
            this.values[i]-=B.values[i]
        }
    }

    static sub(A,B)
    {
        var C = [];
        for(let i =0 ;i<B.length;i++)
        {
            C.push(A.values[i]-B.values[i])
        }
        return new Vector(C)
    }

    normalize()
    {
        var magnitude = this.magnitude()
        for(let i = 0 ; i< this.length;i++)
        {
            this.values[i] /= magnitude   
        }
    }
    
    static normalize(A)
    {
        var norm = []
        var magnitude = A.magnitude()
        for(let i = 0 ; i< A.length;i++)
        {
            norm.push(A.values[i] / magnitude)   
        }
        return new Vector(norm)
    }

    multiply(v)
    {
        for(let i = 0 ; i< this.length;i++)
        {
            this.values[i] *= v   
        }
    }

    limit(Mag)
    {
        if(this.magnitude()>Mag)
        {
            this.normalize()
            this.multiply(Mag)
        }
    }
}