
var canvasSize = {}
canvasSize.x = 600;
canvasSize.y = 600;


// Game Board
var gameCanvas = d3.select ( '.gameCanvas' )

.attr('height', canvasSize.x)
.attr('width', canvasSize.y)


// Hero
var hero = d3.select ( '.hero' )

.attr('cx', canvasSize.x / 2)
.attr('cy', canvasSize.y / 2)
.attr('fill', 'black')


// Enemies
var nEnemies = 10;

var enemyMaker = function (count) {
	var enemies = []
	for (i=0; i <= count; i++) {
		enemy = new Object();
		enemy.id = i;
		enemy.x = Math.random() * 600;
		enemy.y = Math.random() * 600;
		enemies.push(enemy);
	}
	return enemies;
}


// var enemyPosition = function () {
// 	for (i=0; i <= 10; i++) {
// 		var id = i
// 		var xcoord = Math.random() * 600;
// 		var ycoord = Math.random() * 600;
// 		enemy = []
// 		enemy.attr('cx', xcoord)
// 		enemy.attr('cy', ycoord)
// 		enemy.attr('')
// 	};
// 	return enemies
// 	console.log("enemies = "+enemies)
// }



// Path data generator
// var line = d3.svg.line()
//     .x(function(d) { return d.x; })
//     .y(function(d) { return d.y; })
//     .interpolate("basis");