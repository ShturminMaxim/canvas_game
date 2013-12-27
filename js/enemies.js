define('enemies', ['mediator', 'stage'], function (mediator, stage) {
	"use strict";
	var posX = 10,
        posY = 10,
		clickedX,
		clickedY,
		sizeX = 60,
		sizeY = 80,
		x = 0,
		y = 0,
		image = new Image(),
		timer,
		delay = 60;

	image.src = './img/bear.png';

	mediator.subscribe('game_start', function (ctx, canvas) {
		image.onload = function() {
			mediator.subscribe('redraw', function (ctx) {
				ctx.drawImage(image, x, y, sizeX, sizeY, posX, posY, sizeX, sizeY);
			});
            timer = setInterval(function () {
                var canvasX = stage.curX(),
                    canvasY = stage.curY(),

                    mx = canvasX - (stage.curX()-posX+canvas.width /2),
                    my = (stage.curY()-posY+canvas.width /2) - canvasY,
                    vectorLength = Math.sqrt(mx * mx + my * my),
                    alphaRad = Math.atan2(my, mx),
                    step = 5,
                    stepX = step * Math.cos(alphaRad),
                    stepY = step * Math.sin(alphaRad);

                if (vectorLength>5) {
                    posX -= stepX;
                    posY += stepY;
                } else {
                    clearInterval(timer);
                    alert('You are Dead!');
                }
            }, delay);
		};
	});

mediator.subscribe('do_animation', function(canvasPos) {
		clickedX = canvasPos.stepX;
		clickedY = canvasPos.stepY;
		posX += (-clickedX);
		posY += clickedY;
	});
});