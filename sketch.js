const {
    Engine,
    World,
    Bodies,
    Mouse,
    MouseConstraint,
    Constraint
  } = Matter;
  
  let ground;
  const boxes = [];
  let bird;
  let world, engine;
  let mConstraint;
  let slingshot;
  
  let dotImg;
  let boxImg;
  let bgImg;
  
  let bgX1;
  let bgX2;
  
  const scrollSpeed = 2;
  
  let canvas
  
  let screen // start, game, gameover
  
  const winingCounter = 3
  const losingCounter = 3
  
  let winCount 
  let loseCount 
  
  let youWin = false
  
  let gameTimer;
  
  function preload() {
    dotImg = loadImage('images/Angry_Bird_DLS02.png');
    boxImg = loadImage('images/equals.png');
    bgImg = loadImage('images/skyBackground.png');
  }
  
  function setup() {
    canvas = createCanvas(711, 400);
  
    textSize(width / 12);
    textAlign(CENTER, CENTER);
  
    screen = 'start' //'start'
  }
  
  function draw() {
    if (screen === 'start') {
      instructions()
    } else if (screen === 'game') {
      playGame()
    } else if (screen === 'gameover') {
      gameOver()
    }
  }
  
  function instructions() {
    image(bgImg, 0, 0, width, height);
  
    push()
    text('Welcome to Angry Bird', width / 2, height / 2 - 150)
  
    textSize(width / 30);
    text('To win the game you need to ', width / 2, height / 2 - 80)
    text('knock all the blocks down to the ground or out of the scene', width / 2, height / 2 -50)
     text('You only have 15 seconds to win each time', width / 2, height / 2 -20)
    
    text('Move mouse over Start to play the game', width / 2, height / 2 + 40)
  
    textSize(width / 20);
  
    ellipse(width / 2, height / 2 + 120, 100, 100) //90)
    text('Start', width / 2, height / 2 + 120)
    pop()
    
    if (dist(width / 2, height / 2 + 120, mouseX, mouseY) <= 50) {
      winCount = 0
      loseCount = 0
  
      screen = 'game'
      reset();
    }
  }
  
  
  function gameOver() {
    image(bgImg, 0, 0, width, height);
  
    text('Angry Bird Game Is Over', width / 2, height / 2 - 90)
  
    ellipse(width / 2, height / 2 + 50, 350, 120) //90)
  
    const msg = 'You ' + (youWin ? 'Win' : 'Lose') + ' !'
    text(msg, width / 2, height / 2 + 50)
  
  
    push()
    textSize(width / 30);
    textAlign(CENTER, CENTER);
  
    text('Move mouse over Start to play the game again', width / 2, height / 2 + 130)
  
    ellipse(width / 2, height / 2 + 170, 60, 60) //90)
    text('Start', width / 2, height / 2 + 170)
    pop()
  
    if (dist(width / 2, height / 2 + 170, mouseX, mouseY) <= 30) {
      winCount = 0
      loseCount = 0
      
      screen = 'game'
      reset();
    }
  }
  
  function playGame() {
    drawBg()
  
    const winMsg = 'Win: ' + winCount + ', Remaining: ' + (winingCounter - winCount)
     const loseMsg = 'Lose: ' + loseCount + ', Remaining: ' + (losingCounter - loseCount)
     
    push()
    
    textSize(width / 20);
    text(winMsg, width / 2, 30)
    text(loseMsg, width / 2, 60)
    pop()
  
    Matter.Engine.update(engine);
    ground.show();
    for (let box of boxes) {
      box.show();
    }
    slingshot.show();
    bird.show();
  
    if (allBoxOutOfScene() || AllBoxTouchGround()) {
      clearTimeout(gameTimer)
  
      winCount++
      console.log('winCount', winCount)
  
      if (winCount === winingCounter) {
        screen = 'gameover'
        youWin = true
      } else {
        reset()
      }
    }
  }
  
  function allBoxOutOfScene() {
    for (let i = 0; i < 3; i++) {
      if (boxes[i].isInScreen()) {
        return false
      }
    }
  
    return true
  }
  
  function AllBoxTouchGround() {
    for (let i = 0; i < 3; i++) {
      if (!boxes[i].isTouchGround()) {
        return false
      }
    }
  
    return true
  }
  
  function reset() {
    engine = Engine.create();
    world = engine.world;
    ground = new Ground(width / 2, height - 10, width, 20);
  
    const mouse = Mouse.create(canvas.elt);
    const options = {
      mouse: mouse
    };
  
    mouse.pixelRatio = pixelDensity();
    mConstraint = MouseConstraint.create(engine, options);
    World.add(world, mConstraint);
  
    for (let i = 0; i < 3; i++) {
      boxes[i] = new Box(450, 300 - i * 75, 84, 100);
    }
    bird = new Bird(150, 300, 25);
  
    slingshot = new SlingShot(150, 300, bird.body);
  
    bgX1 = 0;
    bgX2 = width;
  
    gameTimer = setTimeout(() => {
      loseCount++
      console.log('loseCount ', loseCount)
      if (loseCount === losingCounter) {
        screen = 'gameover'
      } else {
        reset()
      }
    }, 15000); // 15 seconds timeout
  }
  
  function loseDueToTimeOut() {
    loseCount++
    if (loseCount === losingCounter) {
      screen = 'gameover'
    }
  }
  
  
  function keyPressed() { // after die, press Enter to start it again
    if (key == ' ' && screen === 'game') {
      World.remove(world, bird.body);
      bird = new Bird(150, 300, 25);
      slingshot.attach(bird.body);
    }
  }
  
  function mouseReleased() {
    if (screen === 'game') {
      setTimeout(() => {
        slingshot.fly();
      }, 100);
    }
  }
  
  
  function drawBg() {
    image(bgImg, bgX1, 0, width, height);
    image(bgImg, bgX2, 0, width, height);
  
    bgX1 -= scrollSpeed;
    bgX2 -= scrollSpeed;
  
    if (bgX1 < -width) {
      bgX1 = width;
    }
  
    if (bgX2 < -width) {
      bgX2 = width;
    }
  }