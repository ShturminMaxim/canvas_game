require(['mediator', 'event', 'stage', 'player'], function (mediator, event) {
    "use strict";
	var canvas = document.getElementById('game-canvas'),
		ctx = canvas.getContext('2d'),
		x0 = canvas.width/2,
		y0 = canvas.height/2;


	// get coordinates of the mouse click
	event.bind('click', canvas, function (e) {
		var elDim = canvas.getBoundingClientRect(),
			canvasX = e.clientX - elDim.left,
			canvasY = e.clientY - elDim.top,
			x = canvasX - x0,
			y = y0 - canvasY,
			direction = [];

		if (x > 50) {
			direction.push('right');
		} else if (x < -50) {
			direction.push('left');
		}

		if (y > 50) {
			direction.push('top');
		} else if (y < -50) {
			direction.push('bottom');
		}

		mediator.publish('move_to', [{x: canvasX, y: canvasY, direction: direction.join('|')}]);
	});

	// start the game
	mediator.publish('game_start', [ctx]);

	// loop for redrawing objects on the stage
	setInterval(function () {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		mediator.publish('redraw', [ctx]);
	}, 15);
});