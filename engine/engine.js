// cross browser compatibility
window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||  window.msRequestAnimationFrame;

// creates canvas
canvas = document.createElement("canvas");
ctx = canvas;

document.body.appendChild(canvas);

// -------------------------- Game --------------------------
function Game(canvas, width, height, screens) {
	this.WIDTH = width = undefined ? window.innerWidth : width;
	this.HEIGHT = height = undefined ? window.innerHeight : height;

	this.FPS = 60;

	this.screens = screens;
	this.currentScreen = 0;
	
	canvas.width = this.WIDTH;
	canvas.height = this.HEIGHT;

	ctx = canvas.getContext("2d");

	this.run(this);
}

Game.prototype.init = function() {

}

Game.prototype.run = function(thisGame) {

	var loop = function() {
		thisGame.update();
		thisGame.draw();
		window.requestAnimationFrame(loop, canvas);
	}
	window.requestAnimationFrame(loop, canvas);
}

Game.prototype.update = function() {
	this.screens[this.currentScreen].update();
}

Game.prototype.switchScreen = function(index) {
	currentScreen = index;
}

Game.prototype.draw = function() {
	screens[this.currentScreen].draw();
}

// -------------------------- Screen --------------------------
function Screen(sprites) {
	this.sprites = sprites;
	this.backgroundColour = "#000";
}

Screen.prototype.update = function() {
	
	for (var i = this.sprites.length - 1; i >= 0; i--) {
		this.sprites[i].update;
	};
}

Screen.prototype.draw = function() {
	ctx.save();

	ctx.fillRect(0,0,1000,1000);
	ctx.fillStyle = "black";

	for (var i = this.sprites.length - 1; i >= 0; i--) {
		this.sprites[i].draw();
	};

	ctx.restore();
}

// -------------------------- Sprite --------------------------
function Sprite(imgPath, x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.velX = 0;
	this.velY = 0;

	this.gravityX = 0;
	this.gravityY = 0;

	this.animationFrame = 0;
	this.animationSequence = [];

	var img = new Image();
	img.onload = function() {
		console.log("load");
	}
	img.src = imgPath;
	this.img = img;
}

Sprite.prototype.update = function() {
	this.velX += this.gravityX;
	this.velY += this.gravityY;

	this.x += this.velX;
	this.y += this.velY;
}

Sprite.prototype.draw = function() {
	ctx.drawImage(this.img, this.x, this.y);
}


// -------------------------- Input --------------------------
function Input(ctx) {
	this.ctx = ctx;
}

Input.prototype.init = function() {

}