define('stage', ['mediator'], function (mediator) {

	"use strict";

	var canvasNode = document.getElementById('game-canvas'),
		gameBg,
		bgPath = 'img/game-field.jpg',
		bgGamePos = {
			posX: 0,
			posY: 0,
			sizeX: 300,
			sizeY: 480
		},
		bgClipPos = {
			posX: 480,
			posY: 160,
			sizeX: 1280,
			sizeY: 800
		};

	canvasNode.width = 320;
	canvasNode.height = 480;

	mediator.subscribe('game_start', function (canvasCtx) {
		gameBg = new Image();
		gameBg.src = bgPath;

		gameBg.onload = function() {
			canvasCtx.drawImage(gameBg,
				canvasNode.width / 2 - gameBg.width / 2,
				canvasNode.height / 2 - gameBg.height / 2
//				bgClipPos.posX,
//				bgClipPos.posY,
//				bgClipPos.sizeX,
//				bgClipPos.sizeY,
//				bgGamePos.posX,
//				bgGamePos.posY,
//				bgGamePos.sizeX,
//				bgGamePos.sizeY
			);
		};
	});
});
