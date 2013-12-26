define('player', ['mediator'], function (mediator) {
	"use strict";
	mediator.subscribe('game_start', function () {
		alert('Player is ready!!!');
	});
});
