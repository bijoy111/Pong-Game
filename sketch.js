let leftpaddle;
let rightpaddle;
let leftscore;
let rightscore;
let ball;
function setup() {
  createCanvas(624,351);
  leftpaddle=new paddle(20);
  rightpaddle=new paddle(width-40);
  ball=new Ball();
  leftscore=new score(300-60);
  rightscore=new score(300+60);
}

function draw() {
  background(0);
  ball.display();
  ball.update();
  leftpaddle.display();
  rightpaddle.display();
  processai(ball);
 leftpaddle.update();
  rightpaddle.update();
  leftscore.display(ball.leftscore);
  rightscore.display(ball.rightscore);
  stroke(255);
  line(width/2,0,width/2,height);
}
function processai(){
  let middlepoint=leftpaddle.y+leftpaddle.height/2;
  if(middlepoint<ball.y){
    leftpaddle.isup=false;
    leftpaddle.isdown=true;
  }
  else if(middlepoint>ball.y)
  {
   leftpaddle.isdown=false;
    leftpaddle.isup=true;
  }
}
function keyPressed(){
 if(keyCode==UP_ARROW)
 {
  rightpaddle.isdown=false;
   rightpaddle.isup=true;
 }
  else if(keyCode==DOWN_ARROW)
  {
   rightpaddle.isup=false;
 rightpaddle.isdown=true;
 }
}
function keyReleased(){
 if(keyCode==UP_ARROW)
  rightpaddle.isup=false;
  else if(keyCode==DOWN_ARROW)
  rightpaddle.isdown=false;
}
class score{
 constructor(x){
  this.x=x;
   this.y=60;
 }
  display(score){
   fill(255);
    textAlign(CENTER);
    textSize(60);
    text(score,this.x,this.y);
  }
}
class Ball{
 constructor(){
   this.r=10;
   this.leftscore=0;
   this.rightscore=0;
   this.yspeed=random(2,3);
   this.reset();
 }
  display(){
   fill(255,0,100);
    ellipse(this.x,this.y,this.r*2,this.r*2);
  }
  reset(){
    this.xspeed=random(3,4);
    this.x=width/2;
   this.y=height/2;
  }
  update(){
    if(this.leftscore>=10){
      console.log('gameover');
      console.log('leftpaddle is win');
      this.leftscore=0;
      this.rightscore=0;
    }
    if(this.righttscore>=10){
      console.log('gameover');
      console.log('rightpaddle is win');
      this.leftscore=0;
      this.rightscore=0;
    }
    this.x-=this.xspeed;
    this.y+=this.yspeed;
    if(this.x<=20)
    {
      this.rightscore++;
     this.reset(); 
    }
    else if(this.x>=width-20)
    {
     this.leftscore++;
      this.reset();
    }
    if(this.y<=10||this.y>=height-10)
      this.yspeed=-this.yspeed;
    if(this.x<=50&&this.y>=leftpaddle.y&&this.y<=leftpaddle.y+leftpaddle.height)
      this.xspeed=-this.xspeed;
  else if(this.x>=width-50&&this.y>=rightpaddle.y&&this.y<=rightpaddle.y+rightpaddle.height)
    this.xspeed=-this.xspeed;
  }
}
class paddle{
 constructor(x){
   this.x=x;
   this.y=height/2;
   this.width=20;
   this.height=80;
   this.isup=false;
   this.isdown=false;
 }
  display(){
   fill(255);
    rect(this.x,this.y,this.width,this.height);
  }
  update(){
   if(this.y>0&&this.isup==true)
     this.up();
    else if(this.y<height-80&&this.isdown==true)
      this.down();
  }
  up(){
   this.y-=2;
  }
  down(){
   this.y+=2; 
  }
}