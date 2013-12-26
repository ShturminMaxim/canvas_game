require(['mediator', 'event', 'stage', 'player'], function (mediator, event, stage, player) {
    "use strict";
	var canvas = document.getElementById('game-canvas'),
		ctx = canvas.getContext('2d');

	event.bind('load', window, function () {
		// get coordinates of the mouse click
		event.bind('click', canvas, function (e) {
			var mouseX = e.clientX,
				mouseY = e.clientY,
				elDim = canvas.getBoundingClientRect();

			mediator.publish('move_to', [{x: (mouseX - elDim.left), y: (mouseY - elDim.top)}]);
		});
	});

	// start the game
	mediator.publish('game_start', [ctx]);

	// loop for redrawing objects on the stage
	setInterval(function () {
		stage.redraw();
		player.redraw();
	}, 15);
});