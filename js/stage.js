define('stage', ['mediator'], function (mediator) {

	"use strict";

	var canvasNode = document.getElementById('game-canvas'),
		gameBg,
		bgPath = 'img/game-field.jpg',
		bgGamePos = {
			posX: 0,
			posY: 0,
			sizeX: 1280,
			sizeY: 800
		},
		bgClipPos = {
			posX: 480,
			posY: 160,
			sizeX: 320,
			sizeY: 480
		},
		startX = 0,
		startY = 0,
		clickedX,
		clickedY,
		curX,
		curY;

	canvasNode.width = 320;
	canvasNode.height = 480;
	gameBg = new Image();

	mediator.subscribe('game_start', function (canvasCtx) {
		gameBg.onload = function() {
			curX = startX = canvasNode.width / 2 - gameBg.width / 2;
			curY = startY = canvasNode.height / 2 - gameBg.height / 2;
			console.log(curX);
			console.log(curY);
		};
		gameBg.src = bgPath;
	});

	mediator.subscribe('do_animation', function(canvasPos) {
		clickedX = canvasPos.stepX;
		clickedY = canvasPos.stepY;
		curX += (-clickedX);
		curY += (clickedY);
		// change position
	});

	mediator.subscribe('redraw', function(canvasCtx) {
		canvasCtx.drawImage(
			gameBg,
			curX,
			curY
		);
	});

//	return {
//		redraw: function() {
//			canvasCtx.drawImage(
//				gameBg,
//				bgClipPos.posX,
//				bgClipPos.posY,
//				bgClipPos.sizeX,
//				bgClipPos.sizeY,
//				bgGamePos.posX,
//				bgGamePos.posY,
//				bgGamePos.sizeX,
//				bgGamePos.sizeY
//			);
//		}
//	}
});
