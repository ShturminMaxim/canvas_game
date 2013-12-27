require(['mediator', 'event', 'stage', 'enemies', 'player'], function (mediator, event) {
    "use strict";
	var canvas = document.getElementById('game-canvas'),
		ctx = canvas.getContext('2d'),
		canvasWidth = 600,
		canvasHeight = 600,
		x0 = canvasWidth/2,
		y0 = canvasHeight/2,
		timer;

	canvas.width = canvasWidth;
	canvas.height = canvasHeight;

	// get coordinates of the mouse click
	event.bind('click', canvas, function (e) {
		var elDim = canvas.getBoundingClientRect(),
			canvasX = e.clientX - elDim.left,
			canvasY = e.clientY - elDim.top,
			x = canvasX - x0,
			y = y0 - canvasY,
			vectorLength = Math.sqrt(x * x + y * y),
			alphaRad = Math.atan2(y, x),
			direction = [],
			delay = 15,
			step = 5,
			stepX = step * Math.cos(alphaRad),
			stepY = step * Math.sin(alphaRad),
			currentPos = 0;

		// clear current interval
		clearInterval(timer);

		if (y > 50) {
			direction.push('up');
		} else if (y < -50) {
			direction.push('down');
		}

		if (x > 50) {
			direction.push('right');
		} else if (x < -50) {
			direction.push('left');
		}

		mediator.publish('animation_start', [{x: canvasX, y: canvasY, direction: direction.join('|')}]);

		timer = setInterval(function () {
			if (currentPos < vectorLength) {
				mediator.publish('do_animation', [{stepX: stepX, stepY: stepY}]);
			} else {
				clearInterval(timer);
				currentPos = 0;
				mediator.publish('animation_stop');
			}
			currentPos += step;
		}, delay);
	});

	// start the game
	mediator.publish('game_start', [ctx, canvas]);

	// loop for redrawing objects on the stage
	setInterval(function () {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		mediator.publish('redraw', [ctx]);
	}, 15);
});