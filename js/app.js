require(['mediator', 'stage', 'player'], function (mediator) {
    "use strict";
	var canvas = document.getElementById('game-canvas'),
		ctx = canvas.getContext('2d'),
		grd = ctx.createLinearGradient(0, 0, 170, 0);

	grd.addColorStop(0,"black");
	grd.addColorStop(1,"white");

	ctx.fillStyle = grd;
	ctx.fillRect(20,20,150,100);

	mediator.publish('game_start', [ctx]);
});