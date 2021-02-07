let flock = [];

function setup(){
    createCanvas(1280, 720);
    for(let i = 0; i < 100; i++){
        flock.push(new Boid());
    }
}

function draw(){
    background('#282c34');

    for(let boid of flock){
        boid.edges (flock);
        boid.flock (flock);
        boid.update ();
        boid.show();
    }
}

const alignPerception = 65,
separationPerception = 50,
cohesionPerception = 50;

class Boid {
    constructor() {
        this.pos = createVector(random(width), random(height));
        
        this.vel = p5.Vector.random2D();
        this.vel.setMag(random(2, 4));
        this.acc = createVector();

        this.r = 3.0;

        let rc = 86 + random(-40, 40);
        let gc = 143 + random(-40, 40);
        let bc = 251 + random(-40, 40);

        this.color = color(rc, gc, bc);

        this.maxForce = 0.2;
        this.maxSeparationForce = 0.25;
        this.maxSpeed = 4;
    }

    edges() {
        if(this.pos.x > width) this.pos.x = 0;
        else if(this.pos.x < 0) this.pos.x = width;
        if(this.pos.y > height) this.pos.y = 0;
        else if(this.pos.y < 0) this.pos.y = height;
    }

    flock(boids){
        let alignTotal = 0;
        let cohesionTotal = 0;
        let separationTotal = 0;

        let avgDir = createVector(); // desired direction
        let avgPos = createVector(); // desired cohesion pos
        let separationDesired = createVector(); // desired avoid pos

        for(let other of boids){
            if(other != this){
                let d = dist(other.pos.x, other.pos.y, this.pos.x, this.pos.y);
        
                if(d < alignPerception){ 
                    avgDir.add(other.vel); 
                    alignTotal++;
                }

                if(d < cohesionPerception){ 
                    avgPos.add(other.pos);
                    cohesionTotal++;
                }

                if(d < separationPerception){ 
                    let diff = p5.Vector.sub(this.pos, other.pos);
                    diff.div(d);
                    separationDesired.add(diff);
                    separationTotal++;
                }
            }
        }

        if(alignTotal > 0){
            avgDir.div(alignTotal);
            avgDir.setMag(this.maxSpeed);
            avgDir.sub(this.vel);
            avgDir.limit(this.maxForce);
        }

        if(cohesionTotal > 0){
            avgPos.div(cohesionTotal);
            avgPos.sub(this.pos);
            avgPos.setMag(this.maxSpeed);
            avgPos.sub(this.vel);
            avgPos.limit(this.maxForce);
        }

        if(separationTotal > 0){
            separationDesired.div(separationTotal);
            separationDesired.setMag(this.maxSpeed);
            separationDesired.sub(this.vel);
            separationDesired.limit(this.maxSeparationForce);
        }

        this.acc.add(avgDir);
        this.acc.add(avgPos);
        this.acc.add(separationDesired);
    }

    update(){
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        
        this.vel.limit(this.maxSpeed);

        this.acc.set(0, 0);
    }

    show(){
        // strokeWeight(8);
        // stroke('#568ffb');
        // point(this.pos.x, this.pos.y);

        let theta = this.vel.heading() + radians(90);
        fill(this.color);
        stroke(this.color);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(theta);
        beginShape();
        vertex(0, -this.r * 2);
        vertex(-this.r, this.r * 2);
        vertex(this.r, this.r * 2);
        endShape(CLOSE);
        pop();
    }
}