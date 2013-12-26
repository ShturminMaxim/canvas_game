require(['mediator', 'event', 'stage', 'player'], function (mediator, event) {
    "use strict";
	var canvas = document.getElementById('game-canvas'),
		ctx = canvas.getContext('2d');

	// publish mouse coordination upon a user click
	event.bind('click', canvas, function (e) {
		mediator.publish('move_to', [{x: e.clientX, y:e.clientY}]);
	});

	// start game
	mediator.publish('game_start', [ctx]);
});