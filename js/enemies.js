define('enemies', ['mediator', 'stage'], function (mediator, stage) {
	"use strict";
    function Enemy(config) {
        var that = {
            canvas : config.canvas,
            posX : config.startX || 10,
            posY : config.startX || 10,
            sizeX : 60,
            sizeY : 80,
            x : 0,
            y : 0,
            isChasing:false
        };
        var delay = 60;

        // INIT BEAR
        that.image = new Image();
        that.image.src = './img/bear.png';
        that.chasing = function () {
            var canvasX = stage.curX(),
                canvasY = stage.curY(),

                mx = canvasX - (stage.curX()- that.posX - (that.sizeX/2) + that.canvas.width /2),
                my = (stage.curY()-that.posY - (that.sizeY/2) +that.canvas.width /2) - canvasY,
                vectorLength = Math.sqrt(mx * mx + my * my),
                alphaRad = Math.atan2(my, mx),
                step = 5,
                stepX = step * Math.cos(alphaRad),
                stepY = step * Math.sin(alphaRad);

            if (vectorLength>5) {
                var right;
                var left;
                var up;
                var down;
                var direction = [];

                if(stepX > 1) {
                    direction.push('left');
                }
                if(stepX < -1) {
                    direction.push('right');
                }
                if(stepY > 1) {
                    direction.push('down')
                }
                if(stepY < -1) {
                    direction.push('up');
                }

                //console.log(direction.join('|'));
                that.posX -= stepX;
                that.posY += stepY;

                that.isChasing = true;
                setTimeout(that.chasing, delay);
            } else {
                console.warn('You are Dead!');
            }
        };
        return that;
    }
    var enemies = [];
    var addEnemy = function(ctx, canvas){
        enemies.push(new Enemy({
            type:'bear',
            context:ctx,
            canvas:canvas,
            startX: Math.random()*600,
            startY: Math.random()*600
        }));
    };
    var enemiesChasingInit = function(){
        enemies.forEach(function(elem){
            if(!elem.isChasing) {
                elem.chasing();
            }
        })
    };
    mediator.subscribe('game_start', function (ctx, canvas) {
        addEnemy(ctx, canvas);
        enemiesChasingInit();
        setInterval(function(){
            addEnemy(ctx, canvas);
            enemiesChasingInit();
        }, 2000);
    });

    mediator.subscribe('redraw', function (ctx) {
        enemies.forEach(function(elem){
            ctx.drawImage(elem.image, elem.x, elem.y, elem.sizeX, elem.sizeY, elem.posX, elem.posY, elem.sizeX, elem.sizeY);
        })
    });


    mediator.subscribe('do_animation', function(canvasPos) {
        enemies.forEach(function(elem){
            elem.posX += (-canvasPos.stepX);
            elem.posY += canvasPos.stepY;
        });
	});
});