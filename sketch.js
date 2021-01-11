var ms, msI;
var d, d1, d2, d3, d4, dI;
var par, parI;
var bg, bgI;
var ig;
var jump;
var stand, standI;
var gameState = "serve";
var pg, gg, og;
var score = 0;
var block, blockI;
var bur, burI;

function preload() {
  msI = loadImage("tps-removebg-preview.png");
  dI = loadImage("doodle-1.jpg");
  parI = loadImage("par-removebg-preview.png");
  burI = loadImage("burger-removebg-preview.png");
  blockI = loadImage("lev-removebg-preview.png");
  pg = createGroup();
  gg = createGroup();
  og = createGroup();
  d = createGroup();
}

function setup() {
  createCanvas(1480, 800);
  ms = createSprite(100, 700, 40, 100);
  ms.addImage(msI);
  ms.scale = 0.5;
  ms.debug = false;
  ms.setCollider("rectangle", -40, 1, 300, 440);

  ig = createSprite(500, 800, 2000, 50);

  d1 = createSprite(750, -700, 1500, 50);
  d1.addImage(dI);
  d1.scale = 1.8;
  //d.add(d1);

  d2 = createSprite(-790, 550);
  d2.addImage(dI);
  d2.scale = 1.8;
  //d.add(d2);

  d3 = createSprite(2280, 380);
  d3.addImage(dI);
  d3.scale = 1.8;
  //d.add(d3);

  d4 = createSprite(680, 1580);
  d4.addImage(dI);
  d4.scale = 1.8;
  //d.add(d4);


}

function draw() {
  background(5);

  //SERVE STATE
  if (gameState == "serve") {
    background(0);
    fill("yellow");
    textSize(80);
    text("PRESS ANYWHERE TO START", 135, 450);
    ms.visible = false;
    ig.visible = true;
    pg.visible = false;
    gg.visible = false;
    reset();
  }

  //SWITCH TO PLAY STATE
  if (keyDown("space") || touches.lenght > 0 && gameState == "serve") {
    gameState = "play";
    touches = [];
  }

  //PLAY STATE
  if (gameState == "play") {

    ms.velocityY = ms.velocityY + 0.8;
    ms.collide(d1);
    ms.collide(d4);
    ms.visible = true;
    ig.visible = true;

    if (keyDown("space") || touches.length > 0) {
      ms.velocityY = -15;
      touches = [];
    }
    ms.velocityY = ms.velocityY + 0.6;
    ms.collide(gg);

    if (ms.isTouching(pg)) {
      pg.destroyEach();
      score = score + 1;
    }

    d4.depth = gg.depth;
    d4.depth = d4.depth + 1;


    //SWITCH TO END
    if (ms.x <= 0 || ms.isTouching(og)) {
      gameState = "end";
    }
  }
  
    if (gameState == "end") {
      background(0);
      textSize(50);
      fill("yellow");
      text("TRY AGAIN", 600, 500);
      ms.visible = false;
      og.visible = false;
      gg.visible = false;
      block.visible = true;
      pg.visible = false;
      
    }
  
  if(keyDown("space")&&gameState == "end"){
    gameState = "serve"
    reset();
  }

    spawn();
  
  drawSprites();

  stroke(0);
  textSize(70)
  fill("yellow");
  text("SCORE : " + score, 1000, 100)
}

function spawn() {

  if (frameCount % 140 === 0) {

    var rand = Math.round(random(1, 2));

    switch (rand) {

      case 1:
        block = createSprite(1200, random(400, 820));
        block.velocityX = -5;
        gg.add(block);

        par = createSprite(block.x + (random(1, 5)), block.y - 70);
        par.addImage(parI);
        par.scale = 0.2;
        par.velocityX = -5;
        pg.add(par);
        block.addImage(blockI);
        block.scale = 0.5;
        block.setCollider("rectangle", 40, -30, 360, 100);

        break;

      case 2:
        block = createSprite(1200, random(400, 800));
        block.velocityX = -5;
        gg.add(block);
        block.addImage(blockI);
        block.scale = 0.5;
        block.setCollider("rectangle", 40, -30, 360, 100);

        bur = createSprite(block.x + (random(1, 5)), block.y - 70);
        bur.addImage(burI);
        bur.scale = 0.4;
        bur.velocityX = -5;
        og.add(bur);
    }
  }


}

    function reset(){
    ms.Y = 700;
    ms.velocityX = 0;
    ms.x = 150
    gg.x = 1200;
    gg.y = random(400,800);
    og.velocityX = 0;
      
    }