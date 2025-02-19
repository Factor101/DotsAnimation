function Dot(x, y, size, color, speed = 0)
{
    this.pos = new p5.Vector(x, y);
    this.diameter = size;
    this.color = color;
    this.speed = speed;
    this.partnerIndices = [];

    this.render = function()
    {
        fill(this.color);
        circle(this.pos.x, this.pos.y, this.diameter);
        noFill();
    };

    this.setPos = function(arr)
    {
        this.pos.set(arr);
    };
}