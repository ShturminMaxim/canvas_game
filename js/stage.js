define('stage', ['mediator'], function (mediator) {
	"use strict";
	mediator.subscribe('game_start', function () {
		alert('Stage is ready!!!');
	});
});
