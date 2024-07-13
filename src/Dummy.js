    
    //     function randomNumBetween(min, max){
    //         return min + Math.random() * (max-min);
    //     }

    //     class Vector {
    //         constructor(x, y) {
    //             this.x = x;
    //             this.y = y;
    //         }
    //         static add(vector1, vector2) {
    //             return new Vector(vector1.x + vector2.x, vector1.y + vector2.y);
    //         }
    //         static sub(vector1, vector2) {
    //             return new Vector(vector1.x - vector2.x, vector1.y - vector2.y);
    //         }
    //         static mult(vector, scalar){
    //             return new Vector(vector.x * scalar, vector.y*scalar);
    //         }
    //         static div(vector, scalar){
    //             return new Vector(vector.x / scalar, vector.y / scalar);
    //         }
    //         dot(vector) {
    //             return this.x * vector.x + this.y*vector.y;
    //         }
    //         getTangent(){
    //             return new Vector(-this.y, this.x);
    //         }
    //         mag() {
    //             return Math.sqrt(this.x**2 + this.y**2);
    //         }
    //         copy(){
    //             return new Vector(this.x, this.y);
    //         }
    //         normalize() {
    //             const magnitude = this.mag();
    //             return new Vector(this.x / magnitude, this.y / magnitude);
    //         }
        
    //         multiply(scalar) {
    //             return new Vector(this.x * scalar, this.y * scalar);
    //         }
    //         static random(minX, maxX, minY, maxY){
    //             return new Vector(
    //                 randomNumBetween(minX, maxX),
    //                 randomNumBetween(minY, maxY)
    //             )
    //         }
    //     }
    //     const canvas = canvasRef.current;
    //     canvas.width = 800;
    //     canvas.height = 400;
    //     const hwCenter = 200;
    //     const hhCenter = 200;

    //     var c = canvas.getContext('2d');

    //     console.log(c);
    //     c.lineWidth = 1;

    //     // var colors = [
    //     //     '#F49A5F',
    //     //     '#EE6C3C',
    //     //     '#A47F4C',
    //     //     '#6A5C3C',
    //     //     '#433F25',
    //     // ]

    //     class Particle {
    //         constructor(effect, x, y) {
    //             this.effect = effect;
    //             this.radius = 7;
    //             //constraint x and y to be spawned within boundary.
    //             this.pos = new Vector(x, y)
    //             //add physics stuff
    //             //
    //             this.vel = new Vector(0, 0);
    //             this.acc = new Vector(0, 0.01);
    //         }
    //         draw(context) {
    //             //
    //             context.beginPath();
    //             context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI*2)
    //             context.stroke();
    //         }
    //         update() {
    //             this.pos = Vector.add(this.pos, this.vel);
    //             this.vel = Vector.add(this.vel, this.acc);
    //             this.acc = Vector.mult(this.acc, 1);
    //             // if(this.lineCheck()){
    //             //     this.speedY = -this.speedY*0.8;
    //             // }
    //         }
    //         handleEdges(){
    //             if (this.pos.x - this.radius <= 0 || this.pos.x + this.radius >= effect.width){
    //                 this.vel.x = -this.vel.x;
    //             }else if(this.pos.y - this.radius <= 0 || this.pos.y + this.radius >= effect.height){
    //                 this.vel.y = -this.vel.y;
    //             }
    //         }
    //         collisionDetection(particle){
    //             const v = Vector.sub(this.pos, particle.pos);
    //             const dist = v.mag();
    //             if (dist <= this.radius + particle.radius){
    //                 const unitNormal = Vector.div(v, dist);
    //                 const unitTangent = unitNormal.getTangent();

    //                 const correction = Vector.mult(unitNormal, this.radius + particle.radius);
    //                 const newV = Vector.add(particle.pos, correction);
    //                 this.pos = newV;

    //                 const a = this.vel;
    //                 const b = particle.vel;

    //                 const a_n = a.dot(unitNormal);
    //                 const b_n = b.dot(unitNormal);
    //                 const a_t = a.dot(unitTangent);
    //                 const b_t = b.dot(unitTangent);

    //                 const a_n_final = (a_n * (this.radius - particle.radius) + 2*particle.radius*b_n)/(this.radius + particle.radius);
    //                 const b_n_final = (b_n *(particle.radius - this.radius) + 2*this.radius * a_n) / (this.radius + particle.radius);

    //                 const a_n_after = Vector.mult(unitNormal, a_n_final);
    //                 const b_n_after = Vector.mult(unitNormal, b_n_final);
    //                 const a_t_after = Vector.mult(unitTangent, a_t);
    //                 const b_t_after = Vector.mult(unitTangent, b_t);

    //                 const a_after = Vector.add(a_n_after, a_t_after);
    //                 const b_after = Vector.add(b_n_after, b_t_after);
    //                 this.vel = a_after;
    //                 particle.vel = b_after;
    //             }
    //         }
    //         //?
    //         collisionDetectionWithLine1() {
    //             const lineCoefficients = { A: -1.5, B: 1, C: 100 };
            
    //             const oldPos = this.pos.copy();
    //             this.pos = Vector.add(this.pos, this.vel);
            
    //             // Calculate the distance from the particle's new position to the line
    //             const distanceToLine = Math.abs(lineCoefficients.A * this.pos.x + lineCoefficients.B * this.pos.y + lineCoefficients.C) / Math.sqrt(lineCoefficients.A**2 + lineCoefficients.B**2);
            
    //             if (distanceToLine <= this.radius) {
    //                 // Calculate the unit normal vector of the line
    //                 const unitNormal = new Vector(-lineCoefficients.A, -lineCoefficients.B).normalize();
            
    //                 // Calculate the correction vector
    //                 const correction = unitNormal.multiply(distanceToLine - this.radius);
            
    //                 // Move the particle to the corrected position
    //                 const newV = Vector.add(this.pos, correction);
            
    //                 // Calculate the dot product of velocity and unit normal
    //                 const dotProduct = this.vel.dot(unitNormal);
            
    //                 // Calculate the new velocity after collision (bouncing off the line)
    //                 const newVel = Vector.sub(this.vel, unitNormal.multiply(2 * dotProduct));
            
    //                 this.pos = newV;
    //                 this.vel = newVel;
    //             } else {
    //                 this.pos = oldPos; // Restore the position if no collision occurred
    //             }
    //         }

    //         collisionDetectionWithLine2() {
    //             const lineCoefficients = { A: 1.5, B: 1, C: -500 };
            
    //             const oldPos = this.pos.copy();
    //             this.pos = Vector.add(this.pos, this.vel);
            
    //             // Calculate the distance from the particle's new position to the line
    //             const distanceToLine = Math.abs(lineCoefficients.A * this.pos.x + lineCoefficients.B * this.pos.y + lineCoefficients.C) / Math.sqrt(lineCoefficients.A**2 + lineCoefficients.B**2);
            
    //             if (distanceToLine <= this.radius) {
    //                 // Calculate the unit normal vector of the line
    //                 const unitNormal = new Vector(-lineCoefficients.A, -lineCoefficients.B).normalize();
            
    //                 // Calculate the correction vector
    //                 const correction = unitNormal.multiply(distanceToLine - this.radius);
            
    //                 // Move the particle to the corrected position
    //                 const newV = Vector.add(this.pos, correction);
            
    //                 // Calculate the dot product of velocity and unit normal
    //                 const dotProduct = this.vel.dot(unitNormal);
            
    //                 // Calculate the new velocity after collision (bouncing off the line)
    //                 const newVel = Vector.sub(this.vel, unitNormal.multiply(2 * dotProduct));
            
    //                 // Update the position and velocity of the particle
    //                 this.pos = newV;
    //                 this.vel = newVel;
    //             } else {
    //                 this.pos = oldPos; // Restore the position if no collision occurred
    //             }
    //         }
            
    //         reset() {
    //             this.x = Math.floor(Math.random() * this.effect.width);
    //             this.y = Math.floor(Math.random() * this.effect.height);
    //         }
    //     }
        
    //     //only one instance - main brain of the system
    //     class Effect {
    //         constructor(canvas) {
    //             this.canvas = canvas;
    //             this.height = this.canvas.height;
    //             this.width = this.canvas.width;
    //             this.particles = [];
    //             this.numberOfParticles = 200;
    //             this.gravity = 0.005;
    //             this.init();
    //         }
    //         init() {
        
    //             //
        
    //             //particles
    //             this.particles = []
    //             for (let i = 0; i < this.numberOfParticles; i++) {
    //                 this.particles.push(new Particle(this, Math.random()*100 + 150, 100+Math.random()*50));
    //             }
    //         }

    //         drawHourGlass(context) {
    //             context.beginPath();
    //             //first line - (100, 50) -> (300,350)
    //             //y-y1 = ={(y2 – y1)/(x2 – x1)}(x – x1).
    //             //=> y-50 = {300 / 200} (x-100)
    //             //=> y = 1.5x - 50
    //             context.moveTo(hhCenter - 100, hwCenter - 150);
    //             context.lineTo(hhCenter + 100, hwCenter + 150);
    //             //second line = (100, 350) -> (300m, 50)
    //             //y-350 = {-300/200} (x-100)
    //             //y=-1.5x + 450
    //             context.moveTo(hhCenter + 100, hwCenter - 150);
    //             context.lineTo(hhCenter - 100, hwCenter + 150);
    //             context.closePath();
    //             context.lineWidth = 4;
    //             context.strokeStyle = '#FFFFFF';
    //             context.stroke();
    //             context.lineWidth = 2;
    //         }
    //         //
    //         resize(width, height) {
    //             this.canvas.width = width;
    //             this.canvas.height = height;
    //             this.height = this.canvas.height;
    //             this.width = this.canvas.width;
    //             this.init()
    //         }
    //         render(context) {
    //             //
    //             for(let i=0; i < this.numberOfParticles; i++){
    //                 const current = this.particles[i];
    //                 const rest = this.particles.slice(i+1);
    //                 // this.particles[i].collisionDetectionWithLine2();
    //                 // this.particles[i].collisionDetectionWithLine1();
                    
    //                 for(let p of rest){
    //                     p.collisionDetection(current)
    //                 }
    //             }

    //             this.particles.forEach(particle => {
    //                 particle.draw(context);
    //                 particle.update();
    //                 particle.handleEdges();
    //             })
    //             // this.drawHourGlass(context);
    //         }
    //     }
        
    //     const effect = new Effect(canvas);
        
    //     function animate() {
    //         c.clearRect(0, 0, canvas.width, canvas.height)
    //         effect.render(c);
    //         requestAnimationFrame(animate);
    //     }
    //     animate();