var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score;
var fruit1,fruit2,fruit3,fruit4,fruit1Img,fruit2Img,fruit3Img,fruit4Img;
var wall, wallImg;
var gameOver, gameOverImg;
var restart, restartImg;
var basket, basketImg;
var fruit1G, fruit2G, fruit3G, fruit4G;
var fruitsG;
var bomb, bombImg, bombG;


function preload(){
wallImg = loadImage("wall5.jpg");
fruit1Img = loadImage("fruit1.png");
fruit2Img = loadImage("fruit2.png");
fruit3Img = loadImage("fruit3.png");
fruit4Img = loadImage("fruit4.png");
gameOverImg = loadImage("gameover.png");
restartImg = loadImage("restart.png")
basketImg = loadImage("bow0.png");
bombImg = loadImage("bomb.png");
}

function setup() {
    createCanvas(800,600);

    var message = "put the fruits in the basket";
    console.log(message)

//wall
wall = createSprite(400,200,600,500);
wall.addImage(wallImg);
wall.scale=2.7;

//bomb
bomb= createSprite(200,300,50,50);
bomb.addImage(bombImg);
bomb.scale=0.1;

//fruits
fruit1 = createSprite(300,300,100,100);
fruit1.addImage(fruit1Img);
fruit1.scale=0.3;

fruit2 = createSprite(400,300,100,100);
fruit2.addImage(fruit2Img);
fruit2.scale=0.3;

fruit3 = createSprite(500,300,100,100);
fruit3.addImage(fruit3Img);
fruit3.scale=0.3;

fruit4 = createSprite(600,300,100,100);
fruit4.addImage(fruit4Img);
fruit4.scale=0.2;

gameOver=createSprite(400,450,50,50);
gameOver.addImage(gameOverImg);
gameOver.scale=1.3;

restart=createSprite(400,380,50,50);
restart.addImage(restartImg);


basket=createSprite(300,530,20,20);
basket.addImage(basketImg);
basket.scale=2.1;

fruitsG=createGroup();
bombG=createGroup();


score=0;



}

function draw() {
 background(wallImg);

 //display the score
 text("score: ", score, 40,100);

if(gameState===PLAY){
    
 gameOver.visible=false;
 restart.visible=false;

 wall.velocityY = (4 + 3* score/100)

 wall.velocityY=3;
 

 if(wall.y > 400){
    wall.y = height/2;
 }

 basket.x=World.mouseX;

 spawnBombs();
 spawnFruits();


 if(bombG.isTouching(basket)){
    bombG.destroyEach();
    fruitsG.destroyEach();
    gameState=END;
    
 
 }

 if(fruitsG.isTouching(basket)){
    fruitsG.destroyEach();
    score=score+5;
 }
 
}
 else if (gameState===END){
    restart.visible=true;
    gameOver.visible=true;
    wall.velocityY=0;

    fruitsG.setLifetimeEach(-1);
    bombG.setLifetimeEach(-1);
     
     fruitsG.setVelocityXEach(0);
     bombG.setVelocityXEach(0); 
 }

 if(mousePressedOver(restart)) {
    reset();
    gameState=PLAY;
  }


 drawSprites();

}

function spawnFruits(){

    if (frameCount % 60 === 0){
        var fruit = createSprite(600,165,10,40);
        fruit.velocityY = (6 + score/100);
        
         //generate random fruits
         var rand = Math.round(random(1,4));
         switch(rand) {
           case 1: fruit.addImage(fruit1Img);
                   break;
           case 2: fruit.addImage(fruit2Img);
                   break;
           case 3: fruit.addImage(fruit3Img);
                   break;
           case 6: fruit.addImage(fruit4Img);
                   break;
           default: break;
         }
       
 fruit.scale = 0.3;
 fruit.lifetime = 300;

 fruitsG.add(fruit);
}



}

function spawnBombs() {
    //write code here to spawn the clouds
    if (frameCount % 60 === 0) {
      var bombs = createSprite(600,120,40,10);
      bombs.y = Math.round(random(80,120));
      bombs.addImage(bombImg);
      bombs.scale = 0.1;
      bombs.velocityY = 3;
      
       //assign lifetime to the variable
      bombs.lifetime = 200;
      
      //add each cloud to the group
      bombG.add(bombs);
     
    }
  }
  function reset(){
    gameOver.visible=false;
    restart.visible=false;
    wall.velocityY=3;
    fruitsG.destroyEach();
  bombG.destroyEach();
  score=0;
  basket.x=World.mouseX;


  }