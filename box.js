class Box {
    constructor(x, y, w, h) {
      const options = {
        restitution: 0.5
      };
      this.body = Matter.Bodies.rectangle(x, y, w, h, options);
      Matter.World.add(world, this.body);
      this.w = w;
      this.h = h;
    }
  
    show() {
      const pos = this.body.position;
      const angle = this.body.angle;
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      fill(255);
      rectMode(CENTER);
      imageMode(CENTER);
      image(boxImg, 0, 0, this.w, this.h);
      pop();
    }
    
    isInScreen() {
      const {x, y} = this.body.position
      
      if (x > - this.w/2 && x < width + this.w/2 && y > -this.h/2 && y < height + this.h/2 ) {
        return true
      }
    }
    
    isTouchGround() {
      //const {y} = this.body.position
      //console.log(x, y)
      return (Math.round(this.body.position.y) >= height - 70) 
    }
  }