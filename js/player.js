define('player', ['mediator'], function (mediator) {
	"use strict";
    var image = new Image();
    var sizeX = 37;
    var sizeY = 55;
    var x = 0;
    var y = 0;
    var posX = 140;
    var posY = 210;
    var framesinAnimation = 4;

    image.src = "./img/user.png";

    mediator.subscribe('move_to', function (coords) {
        //get direction from click event
        var direction =  coords.direction ? coords.direction : "right";
        var animationDirection = {
            'down':function(){ y = 0; },
            'up':function(){ y = 180; },
            'left':function(){ y = 60; },
            'right':function(){ y = 120; },
            'up|right':function(){ y = 430; },
            'down|right':function(){ y = 310; },
            'up|left':function(){ y = 370; },
            'down|left':function(){ y = 240; }
        };

        //do player animation
        animationDirection[direction]();

        function animate() {
            x = frame * sizeX;
            frame = frame + 1;
            if(frame > framesinAnimation) {
                frame = 0;
            }
        }
    });


	mediator.subscribe('game_start', function () {
        image.onload = function(){
            mediator.subscribe('redraw', function (ctx) {
                ctx.drawImage(image, x, y, sizeX, sizeY, posX, posY, sizeX, sizeY);
            });
        };
    });
});
