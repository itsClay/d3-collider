// Canvas
var canvasSize = {}
canvasSize.x = 500;
canvasSize.y = 500;

//random integer
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

// Game Board
var gameCanvas = d3.select ( '.gameCanvas' )
	.attr('height', canvasSize.x)
	.attr('width', canvasSize.y)

// Hero
var hero = d3.select ( '.hero' )
	.attr('cx', canvasSize.x / 2)
	.attr('cy', canvasSize.y / 2)
	.attr('fill', 'black');

//=================Enemies====================//


// Enemies
var nEnemies = 10;
var enemies = []

var enemyMaker = function () {
	for (i=0; i <= nEnemies; i++) {
		enemy = new Object();
		enemy.id = i;
		enemy.x = getRandomInt(0, 590);
		enemy.y = getRandomInt(0, 590);
		enemies.push(enemy);
	}
	console.log(enemies)
	return enemies;
};

enemyMaker();

// enemy position update
var enemyUpdate = function (enemies) {
	var enemySelect = gameCanvas.selectAll('circle').data(enemies);

	enemySelect.enter().append('circle')
		.attr ('r', 10)
		.classed ('enemy', true)
		.attr ('cx', function(d) { return d.x; })
		.attr ('cy', function(d) { return d.y; });
	enemySelect.exit()
};

enemyUpdate(enemies);

//setting delay between turns
var initiate = function() {
	setInterval ( enemyPositionUpdate, 1000 );
};

// transitions
var enemyPositionUpdate = function () {
	var enemySelect = gameCanvas.selectAll('circle.enemy').data(enemies);

	enemySelect.transition()
		.duration(1000)
		.attr('cx', function() { return getRandomInt(0, 590) })
		.attr('cy', function() { return getRandomInt(0, 590) })
};

initiate()

//=============== Dragging =================


var drag = d3.behavior.drag()
	.on('drag', function() {
		var mx = d3.mouse(this)[0];
		var my = d3.mouse(this)[1];
		d3.select(this)
		.attr('cx', function () { 
						if (mx <= canvasSize.x && mx >= 0 ) { 
							return mx	
						}
						else if (mx > canvasSize.x) {
							return canvasSize.x -8
						} 
						else {
							return 8
						}
					})
		.attr('cy', function () { 
						if (my <= canvasSize.y && my >= 0) { 
							return my	
						}
						else if (my > canvasSize.y) {
							return canvasSize.y - 8
						} else {
							return 8
						}})
	console.log(mx,my);
	});
 
 d3.select('.hero').call(drag);

//=============== Collision ================

var checkCollision = function () {
	var highScore = d3.select('.high-score').text('highScore')
	var currentScore = d3.select('.current-score').text('score')
	if (currentScore > highScore) {
		return highScore = currentScore;
	};

	enemies.each(function() {
		var heroX;
		var heroY;
		var heroR;
		var enemyX;
		var enemyY;
		var enemyR;
	})

	var heroR = Math.floor(parseFloat(d3.select('.hero').attr('r')));
	var heroY = Math.floor(parseFloat(d3.select('.hero').attr('y')));
	var heroX = Math.floor(parseFloat(d3.select('.hero').attr('x')));
	var enemyR = Math.floor(parseFloat(d3.select('.enemy').attr('r')));
	var enemyY = Math.floor(parseFloat(d3.select('.enemy').attr('y')));
	var enemyX = Math.floor(parseFloat(d3.select('.enemy').attr('x')));

	heroY - enemyY

	Math.sqrt(x ^ 2  + y ^ 2)
}

