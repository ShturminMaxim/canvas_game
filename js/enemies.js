define('enemies', ['mediator', 'stage'], function (mediator, stage) {
	"use strict";
	var posX = 10,
		posY = 10,
		clickedX = 0,
		clickedY = 0,
		sizeX = 37,
		sizeY = 55,
		x = 0,
		y = 0,
		image = new Image();

	image.src = './img/user.png';

	mediator.subscribe('game_start', function (ctx, canvas) {
		image.onload = function() {
			mediator.subscribe('redraw', function (ctx) {
				ctx.drawImage(image, x, y, sizeX, sizeY, posX, posY, sizeX, sizeY);
			});
		};
	});

	mediator.subscribe('do_animation', function(canvasPos) {
		clickedX = canvasPos.stepX;
		clickedY = canvasPos.stepY;
		posX += (-clickedX);
		posY += clickedY;
	});
});