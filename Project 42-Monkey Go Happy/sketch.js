var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana, bananaImage;
var obstacle, obstacleImage;
//var gameOver, gameOverImage;
var score;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

function preload(){
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  gameOverImage = loadImage("gameOver.png")
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;

  //gameOver = createSprite(400, 200);
  //gameOver.addImage(gameOverImage);

  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  FoodGroup = createGroup();
  ObstacleGroup = createGroup();

  score = 0;
  
}

function draw(){ 
  background(0);

  if(gameState===PLAY){
    
    spawnFood();
    spawnObstacle();

    //gameOver.visible = false; 
  
    if(backgr.x<100){
    backgr.x=backgr.width/2;
    }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

  }

  text("Score: " + score, 500, 50);
  score.depth = backImage.depth + 1;
  fill(255);

  drawSprites();
}

function spawnFood(){
  if(frameCount % 80 === 0){
    var banana = createSprite(600, 250, 40, 10);
    banana.y = random(120, 200);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -4;

    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    FoodGroup.add(banana);
  }
  if(FoodGroup.isTouching(player)){
    FoodGroup.destroyEach();
    score = score + 2;
    player.scale += + 0.05
  }
}

function spawnObstacle(){
  if(frameCount % 80 === 0){
    var obstacle = createSprite(500,325,1000,1000);
    //obstacle.x = random(120, 200);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.13;
    obstacle.velocityX = -4;

    obstacle.lifetime = 300;
    player.depth = obstacle.depth + 1;
    ObstacleGroup.add(obstacle);
  }

  if(ObstacleGroup.isTouching(player)){
     gameState = END; 
  }
  else if(gameState === END){
    
    backgr.velocityX = 0;
    player.visible = false;
    player.velocityX = 0;
    
    FoodGroup.destroyEach();
    ObstacleGroup.destroyEach();

    textSize(30);
    Fill(255);
    text("Game Over!", 300, 220)
  }
}
