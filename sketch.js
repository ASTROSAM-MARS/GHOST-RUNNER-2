var ghostStanding, ghostJumping, ghostS, ghostJ;
var towerImage, tower;
var doorImage,door, railingImage, railings;
var railingsGroup;
var gameState="play";
var ivisibleRailing, invisibleGroup;
var survivalTime;

function preload(){
ghostStanding=loadImage("ghost-standing.png");
  ghostJumping=loadImage("ghost-jumping.png");
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  railingImage=loadImage("climber.png");
}

function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300,100,600);
  tower.y=300;
 
  tower.addImage("backgroud",towerImage); tower.velocityY=2;
ghostS=createSprite(300,300);
  ghostS.addImage("ghostIsStanding",ghostStanding);
  ghostS.scale=0.3;
  
  railingsGroup=new Group();
  invisibleGroup=new Group();

}

function draw(){
  background(3);

 
if(gameState=="play"){
  if(tower.y>600){
    tower.y=300; 
     survivalTime = Math.ceil(frameCount/frameRate());
     
  }
  if(keyWentDown("space")){
    ghostS.velocityY=-2;
  }
  if(keyDown("LEFT_ARROW")){
    ghostS.x=ghostS.x-5;
  }
  if(keyDown("RIGHT_ARROW")){
    ghostS.x=ghostS.x+5;
  }
  if(ghostS.y>600){
   
    gameState="end";
  }
  ghostS.velocityY=ghostS.velocityY+0.2;
  spawnDoors();
  if(ghostS.isTouching(railingsGroup)){
    ghostS.velocityY=0;
    
  }
  if(ghostS.isTouching(invisibleGroup)){
    gameState="end";
  }

  if(ghostS.y<100)
  gameState = "end";

  camera.position.y = ghostS.y;
  console.log(ghostS.y);
  drawSprites();
  
}
  if(gameState=="end"){
    tower.destroy();
    railingsGroup.destroyEach();
    ghostS.destroy();
    textSize(30);
    fill(250);
    text("GAME OVER",200,tower.y-100);
  }
 
}

function spawnDoors(){
  if(frameCount%300==0){
    door=createSprite(Math.round(random(250,450)),-10);
    door.velocityY=2;
    door.addImage("doors",doorImage  );
    railings=createSprite(door.x,door.y+48);
    railings.velocityY=2;
    railings.addImage("railings",railingImage);
    railingsGroup.add(railings);
    door.depth=ghostS.depth;
    ghostS.depth=ghostS.depth+1;   invisibleRailing=createSprite(railings.x,railings.y+5,railings.width,10);
    invisibleRailing.velocityY=2;
    invisibleGroup.add(invisibleRailing);
  }
  
}


