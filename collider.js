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

var nEnemies = 10;
var enemies = []

// enemy maker
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

// setting delay between turns
var initiate = function() {
	setInterval ( enemyPositionUpdate, 1000 );
};

// transitions
var enemyPositionUpdate = function () {
	var enemySelect = gameCanvas.selectAll('circle.enemy').data(enemies);
	console.log(enemies)

	enemySelect.transition()
		.duration(1000)
		.attr('cx', function() { return getRandomInt(0, 590) })
		.attr('cy', function() { return getRandomInt(0, 590) })
		.tween("text", function() {
		  var i = d3.interpolateRound(0, 100);
		  return function(t) {
		    this.textContent = i(t);
		  };
		});	
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
	});
 d3.select('.hero').call(drag);


//=============== Scoring ===================

var currentScore = 0;
var highScore = 0;

var scoreKeeper	= function() {
	currentScore += 100;
	var hScore = d3.select('.high-score').text('High Score:' + highScore);
	var currScore = d3.select('.current-score').text('Score: ' + currentScore);

	if (currentScore > highScore) {
		highScore = currentScore;
	};
};
setInterval(scoreKeeper, 100)

//=============== Collision ================

var checkCollision = function () {

	d3.select('circle').each(function() {
		var heroR = parseFloat(d3.select('.hero').attr('r'));
		var heroY = parseFloat(d3.select('.hero').attr('cy'));
		var heroX = parseFloat(d3.select('.hero').attr('cx'));
		var enemyR = parseFloat(d3.select('.enemy').attr('r'));
		var enemyY = parseFloat(d3.select('.enemy').attr('cy'));
		var enemyX = parseFloat(d3.select('.enemy').attr('cx'));

		var collisionY = (heroY + heroR) - (enemyY + enemyR);
		var collisionX = (heroX + heroR) - (enemyX + enemyR);
		var collision = Math.sqrt( Math.pow(collisionX, 2) + Math.pow(collisionY, 2));

		if (collision < (heroR + enemyR)) {
			return currentScore = 0;
		};
	});
};
setInterval(checkCollision, 100);


