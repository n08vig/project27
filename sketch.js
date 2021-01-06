var engine, world;
var bob1, bob2, bob3, bob4, bob5;
var roof;
var rope1, rope2, rope3, rope4, rope5;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint = Matter.Constraint

function preload() {
	//Nothing to put in
}

function setup() {
	createCanvas(1600, 700);

  engine = Engine.create();
	world = engine.world;

  roof = new Roof(width/2, height/4, width/7, 20);
  
  startBobPositionX = width/2;
  startBobPositionY = height/4 + 500;
  bobDiameter = 40;

  bob1 = new Bob(startBobPositionX - bobDiameter * 2, startBobPositionY, bobDiameter);
  bob2 = new Bob(startBobPositionX - bobDiameter, startBobPositionY, bobDiameter);
  bob3 = new Bob(startBobPositionX, startBobPositionY, bobDiameter);
  bob4 = new Bob(startBobPositionX + bobDiameter, startBobPositionY, bobDiameter);
  bob5 = new Bob(startBobPositionX + bobDiameter * 2, startBobPositionY, bobDiameter);

  rope1 = new Rope(bob1.body, roof.body, -bobDiameter * 2, 0);
  rope2 = new Rope(bob2.body, roof.body, -bobDiameter, 0);
  rope3 = new Rope(bob3.body, roof.body, -bobDiameter + bobDiameter, 0);
  rope4 = new Rope(bob4.body, roof.body, bobDiameter, 0);
  rope5 = new Rope(bob5.body, roof.body, bobDiameter * 2, 0);

  var render = Render.create({
	  element: document.body,
	  engine: engine,
	  options: {
	    width: 1600,
	    height: 700,
	    wireframes: false
	  }
	});

  Engine.run(engine);
  Render.run(render);
}

function draw() {
  rectMode(CENTER);
  background(255);

  roof.display();

  bob1.display();
  bob2.display();
  bob3.display();
  bob4.display();
  bob5.display();

  rope1.display();
  rope2.display();
  rope3.display();
  rope4.display();
  rope5.display();
}

function keyPressed() {
  if(keyCode === UP_ARROW) {
    Matter.Body.applyForce(bob1.body, bob1.body.position, {x: -50, y: -45});
  }
} 

function drawLine(constraint) {
  bobBodyPosition = constraint.bodyA.position
  roofBodyPosition = constraint.bodyB.position;
  
  roofBodyOffset = constraint.bodyB;
  
  roofBodyX = roofBodyPosition.x + roofBodyOffset.x;
  roofBodyY = roofBodyPosition.y + roofBodyOffset.y;
  
  line(bobBodyPosition.x, bobBodyPosition.y, roofBodyX, roofBodyY);
}