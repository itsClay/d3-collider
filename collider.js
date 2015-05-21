// Canvas
var canvasSize = {}
canvasSize.x = 550;
canvasSize.y = 600;

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

//===========================================//


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

// Path data generator
// var line = d3.svg.line()
//     .x(function(d) { return d.x; })
//     .y(function(d) { return d.y; })
//     .interpolate("basis");