require(['mediator', 'stage', 'player'], function (mediator) {
    "use strict";
	var canvas = document.getElementById('game-canvas'),
		ctx = canvas.getContext('2d');

	mediator.publish('game_start', [ctx]);
});