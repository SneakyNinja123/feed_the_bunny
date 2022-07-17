const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;

var bg_img;
var food;
var rabbit;

var button,blower;
var bunny;
var blink,eat,sad;
var mute_btn;

var fr,rope2;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(500,700);

  frameRate(80);

  bk_song.play();
  bk_song.setVolume(1);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(20,30);
  button.size(50,50);
  button.mouseClicked(drop);

  button_2 = createImg('cut_btn.png');
  button_2.position(220,35);
  button_2.size(50,50);
  button_2.mouseClicked(drop_2);

  button_3 = createImg('cut_btn.png');
  button_3.position(300,30);
  button_3.size(50,50);
  button_3.mouseClicked(drop_3);

  mute_sound = createImg('mute.png');
  mute_sound.position(350,30);
  mute_sound.size(50,50);
  mute_sound.mouseClicked(mute);

  blower = createImg('balloon.png');
  blower.position(30,250);
  blower.size(150,100);
  blower.mouseClicked(air_blow)



  
  rope = new Rope(7,{x:40,y:30});
  rope_2 = new Rope(7,{x:240,y:35});
  rope_3 = new Rope(7,{x:320,y:30});
  ground = new Ground(200,690,600,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(260,620,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_2_con = new Link(rope_2,fruit);
  fruit_3_con = new Link(rope_3,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,490,690);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope_2.show();
  rope_3.show();
  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eating_sound.play();
    eating_sound.setVolume(1)
  }


  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    fruit=null;
    sad_sound.play();
    sad_sound.setVolume(1);
     
   }
   
}

function drop(){
  rope.break();
  fruit_con.detach();
  fruit_con = null;
  
  cut_sound.play();
  cut_sound.setVolume(1);
}

function drop_2(){
  rope_2.break();
  fruit_2_con.detach();
  fruit_2_con = null;

  cut_sound.play();
  cut_sound.setVolume(1);
}

function drop_3(){
  rope_3.break();
  fruit_3_con.detach();
  fruit_3_con = null;

  cut_sound.play();
  cut_sound.setVolume(1);
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute(){
  if(bk_song.isPlaying()){
    bk_song.stop()
  }
  else{
    bk_song.play()
  }
}

function air_blow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0});
  air.play();
}


