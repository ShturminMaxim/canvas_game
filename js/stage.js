define('stage', ['mediator'], function (mediator) {

	"use strict";

	var canvasNode,
		gameBg = new Image(),
		bgPath = 'img/world.png',
		clickedX = 0,
		clickedY = 0,
		curX = 0,
		curY = 0,
		stopX = 0,
		stopY = 0,
		canvasW,
		canvasH,
		gameBgW,
		gameBgH;

	mediator.subscribe('game_start', function (canvasCtx, canvas) {
		canvasNode = canvas;
		gameBg.onload = function() {
			gameBgW = this.width;
			gameBgH = this.height;
			curX = canvasNode.width / 2 - gameBg.width / 2;
			curY = canvasNode.height / 2 - gameBg.height / 2;
		};
		gameBg.src = bgPath;
		canvasW = canvasNode.width / 2;
		canvasH = canvasNode.height / 2;
	});

	mediator.subscribe('do_animation', function(canvasPos) {
		clickedX = canvasPos.stepX;
		clickedY = canvasPos.stepY;
		curX += (-clickedX);
		curY += clickedY;
	});

	mediator.subscribe('redraw', function(canvasCtx) {
		if(curX < canvasW && curX > -(gameBgW - canvasW) && curY < canvasH && curY > -(gameBgH - canvasH)) {
			canvasCtx.drawImage(
				gameBg,
				curX,
				curY
			);
			stopX = curX;
			stopY = curY;
		} else {
			canvasCtx.drawImage(
				gameBg,
				stopX,
				stopY
			);
		}
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
