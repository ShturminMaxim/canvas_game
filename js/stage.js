define('stage', ['mediator'], function (mediator) {

	"use strict";

	var canvasNode,
		gameBg = new Image(),
		bgPath = 'img/world.png',
		clickedX = 0,
		clickedY = 0,
		curX = 0,
		curY = 0;

	mediator.subscribe('game_start', function (canvasCtx, canvas) {
		canvasNode = canvas;
		gameBg.onload = function() {
			curX = canvasNode.width / 2 - gameBg.width / 2;
			curY = canvasNode.height / 2 - gameBg.height / 2;
		};
		gameBg.src = bgPath;
	});

	mediator.subscribe('do_animation', function(canvasPos) {
		clickedX = canvasPos.stepX;
		clickedY = canvasPos.stepY;
		curX += (-clickedX);
		curY += clickedY;
	});

	mediator.subscribe('redraw', function(canvasCtx) {
		canvasCtx.drawImage(
			gameBg,
			curX,
			curY
		);
	});

	return {
		curX: function() {
			return curX;
		},
		curY: function() {
			return curY;
		}
	}
});
