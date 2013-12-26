define('player', ['mediator'], function (mediator) {
	"use strict";
	mediator.subscribe('game_start', function (ctx) {
		console.log('Player is ready!!!');
	});
});
