// Enemies our player must avoid
var Enemy = function(initialX, initialY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
	this.x = initialX;
	this.y = initialY;
	this.speed = speed;
	
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 700) {
        // Initial enemy x-axis position
        this.x = -60;
        this.randomSpeed();
    }
    var bugHitBoxLeft = this.x - 45;
    var bugHitBoxRight = this.x + 45;
    var bugHitBoxTop = this.y - 45;
    var bugHitBoxBottom = this.y + 45;

    if (player.x > bugHitBoxLeft && player.x < bugHitBoxRight && player.y > bugHitBoxTop && player.y < bugHitBoxBottom) {
	    playerScore -= 2;
   		updateScore(playerScore);
        player.resetPlayerPosition();
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Enemy.prototype.randomSpeed = function() {
    var speedMultiply = Math.floor(Math.random() * 5 + 1);
    this.speed = 75 * speedMultiply;
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var initialPlayerX = 200;
    initialPlayerY = 300;
var Player = function() {
	this.x = initialPlayerX;
	this.y = initialPlayerY;
	this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function() {
	
}

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.resetPlayerPosition = function() {	
	this.x = initialPlayerX;
	this.y = initialPlayerY;
}

Player.prototype.handleInput = function(keyPressed) {
	var playerYMovement = 85;
	var playerXMovement = 100;
	if (keyPressed === 'up'){
		this.y -= playerYMovement;
		console.log(this.x + ', ' + this.y);
	}
	if (this.y < 0){
		playerScore += 1;
		updateScore(playerScore);
		player.resetPlayerPosition();
	}
	if (keyPressed === 'down' && this.y < 300){
		this.y += playerYMovement;
		console.log(this.x + ', ' + this.y);
	}
	if (keyPressed === 'right' && this.x < 400){
		this.x += playerXMovement;
		console.log(this.x + ', ' + this.y);
	}
	if (keyPressed === 'left' && this.x > 0){
		this.x -= playerXMovement;
		console.log(this.x + ', ' + this.y);
	}	
		
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

// Instantiate Enemies
for (var i = 0; i < 3; i++){
	var tempSpeed = Math.floor(Math.random() * 5 + 1) * 80;
	allEnemies.push(new Enemy(60, 60 + 85 * (i % 3), tempSpeed));
}

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

var playerScore = 0;

var updateScore = function(newScore) {
	var currentScore = document.getElementById('score');
	currentScore.innerHTML = newScore;
}
