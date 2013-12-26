require(['mediator', 'event', 'stage', 'player'], function (mediator, event) {
    "use strict";
	var canvas = document.getElementById('game-canvas'),
		ctx = canvas.getContext('2d');

	event.bind('click', canvas, function (e) {
		var offsetX = e.clientX,
			offsetY = e.clientY;
		mediator.publish('move_to', [{x: offsetX, y: offsetY}]);
	});
	mediator.publish('game_start', [ctx]);
});