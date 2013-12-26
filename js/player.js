define('player', ['mediator'], function (mediator) {
	"use strict";
    var image = new Image();
    var size = 50;
    var x = 0;
    var y = 0;
    var posX = 10;
    var posY = 10;

    image.src = "./img/char.png";
	mediator.subscribe('game_start', function (ctx) {
        image.onload = function(){
            mediator.subscribe('redraw', function (ctx) {
                ctx.drawImage(image, x, y, size, size, posX, posY, size, size);
            });
        };
	});
/*    return {
        redraw : function(){
            ctx.drawImage(image, x, y, size, size, posX, posY, size, size);
        }
    }*/
});
