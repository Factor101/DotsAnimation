const Vector = p5.Vector;
const dotSize = 12;
const lineColor = 255;
const diameter = 750;

const dots = [];
const colorTable = [
    [255, 0, 0],
    [255, 85, 0], 
    [255, 170, 0],
    [255, 255, 0],
    [170, 255, 0],
    [85, 255, 0],
    [0, 255, 0],
    [0, 255, 85],
    [0, 255, 170],
    [0, 255, 255],
    [0, 170, 255],
    [0, 85, 255],
    [255, 0, 0],
    [255, 85, 0], 
    [255, 170, 0],
    [255, 255, 0],
    [170, 255, 0],
    [85, 255, 0],
    [0, 255, 0],
    [0, 255, 85],
    [0, 255, 170],
    [0, 255, 255],
    [0, 170, 255],
    [0, 85, 255]
];


function setup() 
{
    createCanvas(windowWidth, windowHeight);
    
    let speed = 0.0;
    for(const e of colorTable)
    {
        dots.push(new Dot(
            width / 2,
            height / 2 - diameter / 2,
            dotSize,
            e,
            speed
        ));

        speed += 0.1;
    }

    //dots = [dots[6], dots[9], dots[11]]
    frameRate(120)
}
  
function draw() 
{
    const lines = [];

    background(0);
    stroke(lineColor);
    strokeWeight(1.75);
    circle(width / 2, height / 2, diameter);
    fill(255);
    
    for(let i = 0; i < dots.length; i++)
    {
        for(let j = 0; j < dots.length; j++)
        {
            if(j === i || dots[i].partnerIndices.indexOf(j) !== -1 || dots[j].partnerIndices.indexOf(i) !== -1) 
                continue;

            dots[i].partnerIndices.push(j);
            stroke(lineColor);
            strokeWeight(0.5);


            // this entire little snippet is so that the lines dont draw from inside the dots
            const directionTo = Math.atan2(
                dots[j].pos.y - dots[i].pos.y,
                dots[j].pos.x - dots[i].pos.x
            );
            const toPos = new Vector(
                dots[i].pos.x + (dotSize / 2 - 1) * (Math.cos(directionTo)),
                dots[i].pos.y + (dotSize / 2 - 1) * (Math.sin(directionTo))
            );

            const directionFrom = Math.atan2(
                dots[i].pos.y - dots[j].pos.y,
                dots[i].pos.x - dots[j].pos.x
            );

            const fromPos = new Vector(
                dots[j].pos.x + (dotSize / 2 - 1) * (Math.cos(directionFrom)),
                dots[j].pos.y + (dotSize / 2 - 1) * (Math.sin(directionFrom))
            );

            lines.push([
                toPos.x,
                toPos.y,
                fromPos.x,
                fromPos.y
            ]);

            noStroke();
        }
    }
    

    for(let i = 0; i < dots.length; i++)
    {
        strokeWeight(0.5);
        dots[i].render();
        dots[i].partnerIndices = [];
        dots[i].setPos(rotatePoint(width / 2, height / 2, dots[i].pos.x, dots[i].pos.y, dots[i].speed));
    }

    
    for(let i = 0; i < lines.length; i++)
    {
        stroke(lineColor);
        strokeWeight(0.5);
        line(lines[i][0], lines[i][1], lines[i][2], lines[i][3]);
    }
}

/**
 * 
 * @description Rotates a point n degrees and returns the resultant points in a 2D Cartesian plane.
 * 
 * @param {number} cx - origin x 
 * @param {number} cy - origin y
 * @param {number} x - x
 * @param {number} y - y
 * @param {number} angle - Angle to rotate, in degrees
 * @param {boolean} [isAntiClockwise = true] - Rotate Clockwise or Anti-Clockwise
 * 
 * @returns {Array.<x: Number, y: Number>}
 */
function rotatePoint(cx, cy, x, y, angle, isAntiClockwise = true) 
{
    if(angle === 0)
        return [x, y];

    const radians = (Math.PI / ((isAntiClockwise ? 1 : -1) * 180)) * angle;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);

    return [(cos * (x - cx)) + (sin * (y - cy)) + cx, (cos * (y - cy)) - (sin * (x - cx)) + cy];
}