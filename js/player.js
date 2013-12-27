define('player', ['mediator'], function (mediator) {
	"use strict";
    var image = new Image();
    var sizeX = 37;
    var sizeY = 55;
    var x = 0;
    var y = 0;
    var posX = 140;
    var posY = 210;
    var framesinAnimation = 3;
    var frame = 0;
    var animationLoop;

    image.src = "./img/user.png";

    mediator.subscribe('animation_start', function (coords) {
        //get direction from click event
        var direction =  coords.direction ? coords.direction : "right";

        var animationDirection = {
            'down':function(){ y = 0; animate()},
            'up':function(){ y = 180; animate()},
            'left':function(){ y = 60; animate()},
            'right':function(){ y = 120; animate()},
            'up|right':function(){ y = 430; animate()},
            'down|right':function(){ y = 310; animate()},
            'up|left':function(){ y = 370; animate()},
            'down|left':function(){ y = 240; animate()}
        };

        //do player animation
        clearInterval(animationLoop);
        animationDirection[direction]();

        //when player stops, animation stops too.
        mediator.subscribe('animation_stop', function () {
            clearInterval(animationLoop);
            x = 0;
        });

        function animate() {
            var changeFrame = function() {
                x = frame * sizeX;
                frame = frame + 1;
                if(frame > framesinAnimation) {
                    frame = 0;
                }
            };
            animationLoop = setInterval(function(){
                changeFrame();
            },80);
        }
    });


	mediator.subscribe('game_start', function (ctx, canvas) {
        posX = (canvas.width/2) - (sizeX/2);
        posY = (canvas.height/2) - (sizeY/2);
        image.onload = function(){
            mediator.subscribe('redraw', function (ctx) {
                ctx.drawImage(image, x, y, sizeX, sizeY, posX, posY, sizeX, sizeY);
            });
        };
    });
});
