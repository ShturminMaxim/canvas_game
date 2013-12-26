define('player', ['mediator'], function (mediator) {
	"use strict";
    var image = new Image();
    var size = 50;
    var x = 0;
    var y = 0;
    var posX = 135;
    var posY = 215;


    image.src = "./img/char.png";

    mediator.subscribe('move_to', function (coords) {
        //get direction from click event
        var direction =  coords.direction ? coords.direction : "right";
        var animationDirection = {
            'down':function(){},
            'up':function(){},
            'left':function(){},
            'right':function(){},
            'up|right':function(){},
            'down|right':function(){},
            'up|left':function(){},
            'down|left':function(){}
        };

        //do player animation
        animationDirection[direction]();

    });


	mediator.subscribe('game_start', function () {
        image.onload = function(){
            mediator.subscribe('redraw', function (ctx) {
                ctx.drawImage(image, x, y, size, size, posX, posY, size, size);
            });
        };
    });
});
