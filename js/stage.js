define('stage', ['mediator'], function (mediator) {
	"use strict";
	mediator.subscribe('game_start', function () {
		console.log('Stage is ready!!!');
	});
});
