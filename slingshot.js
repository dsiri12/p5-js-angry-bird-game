class SlingShot {
    constructor(x, y, body) {
      const options = {
        pointA: {
          x: 250,
          y: 200
        },
        bodyB: body,
        stiffness: 0.04,
        length: 20
      };
      this.sling = Constraint.create(options);
      World.add(world, this.sling);
    }
  
    fly() {
      this.sling.bodyB = null;
    }
  
    show() {
      if (this.sling.bodyB) {
        stroke(0);
        strokeWeight(4);
        const posA = this.sling.pointA;
        const posB = this.sling.bodyB.position;
        line(posA.x, posA.y, posB.x, posB.y);
      }
    }
  
    attach(body) {
      this.sling.bodyB = body;
    }
    
    isAttach() {
      return this.sling.bodyB !== null
    }
  }