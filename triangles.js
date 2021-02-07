let canvas, ctx;
let a = -90;

let position; 

let direction = {
    x: 0,
    y: 250,
}

window.onload = function() {
    canvas = document.getElementsByTagName('canvas')[0];
    ctx = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 800;

    position = {
        x: canvas.width / 2,
        y: canvas.height / 2,
    }

    update();
}

function update(){
    ctx.fillStyle = 'rgb(220, 220, 220)';
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();

    ctx.strokeStyle = "rgb(255, 0, 100)";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(position.x, position.y);
    ctx.lineTo(direction.x + position.x, direction.y  + position.y);
    ctx.stroke();

    // let tangentRatio = direction.y / direction.x;
    // let polarAngleTg = Math.tan( deg2rad(tangentRatio) )
    // let inverseTg = 1 / polarAngleTg;

    // a = inverseTg;

    drawTriangle(position.x, position.y, 400, 145, a);

    a += 0.5;

    requestAnimationFrame(update);
}

function deg2rad(d){ return d * Math.PI / 180; }

function drawTriangle(posx, posy, height, angleDiference, angle){
    
    let p1x = Math.cos(deg2rad(angle)) * height / 2 + posx;
    let p1y = Math.sin(deg2rad(angle)) * height / 2 + posy;
    let p2x = Math.cos(deg2rad(angle - angleDiference)) * height / 2 + posx;
    let p2y = Math.sin(deg2rad(angle - angleDiference)) * height / 2 + posy;
    let p3x = Math.cos(deg2rad(angle + angleDiference)) * height / 2 + posx;
    let p3y = Math.sin(deg2rad(angle + angleDiference)) * height / 2 + posy;

    // ctx.lineWidth = 10;
    // ctx.beginPath();
    // ctx.moveTo(p1x, p1y);
    // ctx.lineTo(p2x, p2y);
    // ctx.moveTo(p1x, p1y);
    // ctx.lineTo(p3x, p3y);
    // ctx.moveTo(p2x, p2y);
    // ctx.lineTo(p3x, p3y);
    // ctx.stroke();

    ctx.fillStyle = '#568ffb';
    ctx.beginPath();
    ctx.moveTo(p1x, p1y);
    ctx.lineTo(p2x, p2y);
    ctx.lineTo(p3x, p3y);
    ctx.moveTo(p1x, p1y);
    ctx.closePath();
    ctx.fill();
}