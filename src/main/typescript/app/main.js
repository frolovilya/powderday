/*
 * Application logic
 */
var Main = function() {

    // fill screen with trees
    var plantTrees = function(layer, x, y, width, height) {
        var treeCount = Math.floor(Math.random() * (10 - 3) + 3);

        for(var i = 0; i < treeCount; i++) {
            // position on area
            var randX = x + Math.floor(Math.random() * width);
            var randY = y + Math.floor(Math.random() * height);

            // get random tree
            var treeNum = Math.round( Math.random() * (resources.trees.length - 1) );
            var tree = resources.trees[treeNum];
            var treeObject = new TreeObject(tree, randX, randY);

            // sizes
            var maxSize = 160;
            var minSize = maxSize * 0.7;

            var newWidth = Math.floor( Math.random() * (maxSize - minSize) + minSize );
            var scale = treeObject.width / newWidth;
            treeObject.scale(scale);

            // add tree to layer
            layer.addObject( treeObject );
        }
    }

    // layers
    var playerLayer = null;
    var treeLayer = null;
    var debugLayer = null;

    // game state
    var state = {
        angle: 0,
        prevAngle: 0,
        Vy: 0,
        Vx: 0,
        score: 0
    }

    var animated = true;

    // accelerometer state
    var acc = {
        x: 0,
        y: 0,
        z: 0
    }

    // init game state
    this.init = function() {
        // initialize scene
        window.scene = new Scene("scene");

        // screen size
        var ww = $(window).width();
        var wh = $(window).height();

        // resize scene
        scene.resize( ww, wh );

        // default state
        var playerObject = new PlayerObject(resources.player);
        playerLayer = scene.createLayer("player", 10, true);
        playerLayer.ctx.lineWidth = 10;
        playerLayer.translate(
            playerLayer.canvas.width / 2,
            playerLayer.canvas.height / 2
        );
        playerLayer.addObject( playerObject );

        treeLayer = scene.createLayer("tree", 100, true);
        plantTrees(treeLayer, -ww, 0, ww, wh);
        plantTrees(treeLayer, 0, wh * 2 / 3, ww, wh);
        plantTrees(treeLayer, ww, 0, ww, wh);
        plantTrees(treeLayer, -ww, wh, ww, wh);
        plantTrees(treeLayer, 0, wh, ww, wh);
        plantTrees(treeLayer, ww, wh, ww, wh);

        debugLayer = scene.createLayer("debug", 200);
        debugLayer.ctx.font = "bold 12px Arial";
        
        // pre-render scene
        scene.render();

        // start game button
        $("#startGameScene .button").click(function(e) {
            e.preventDefault();

            $("#startGameScene").hide();

            // start animation
            startWatch();
            animated = true;
            //startAnim();
            window.animId = window.requestAnimFrame(startAnim);
        });
    }

    // tree/player intersection event handler
    Scene.Intersections.onIntersect("tree", "player", function() {
        stopAnim();
        stopWatch();
        //navigator.notification.vibrate(100);

        debugLayer.clear();

        $("#endGameScene").show();
        $("#score").text(state.score);

        // replay button
        $("#endGameScene .button").unbind("click");
        $("#endGameScene .button").click(function(e) {
            e.preventDefault();

            $("#endGameScene").hide();

            // default state
            state = {
                angle: 0,
                prevAngle: 0,
                Vy: 0,
                Vx: 0,
                score: 0
            };

            // clear tree layer
            treeLayer.clear();
            treeLayer.clearObjects();
            // retranslate to 0,0
            treeLayer.translate(-treeLayer.translation.x, -treeLayer.translation.y);

            // screen size
            var ww = $(window).width();
            var wh = $(window).height();

            plantTrees(treeLayer, -ww, 0, ww, wh);
            plantTrees(treeLayer, 0, wh * 2 / 3, ww, wh);
            plantTrees(treeLayer, ww, 0, ww, wh);
            plantTrees(treeLayer, -ww, wh, ww, wh);
            plantTrees(treeLayer, 0, wh, ww, wh);
            plantTrees(treeLayer, ww, wh, ww, wh);

            // pre-render scene
            scene.render();

            // start animation
            startWatch();
            animated = true;
            window.animId = window.requestAnimFrame(startAnim);
            //startAnim();
        });
    });
    
    // the watch id references the current `watchAcceleration`
    var watchID = null;
    var startWatch = function() {
        var options = { frequency: model.parameters.time * 1000 };
        watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
    }
    var stopWatch = function() {
        if (watchID) {
            navigator.accelerometer.clearWatch(watchID);
            watchID = null;
        }
    }
    // onSuccess: get a snapshot of the current acceleration
    var onSuccess = function(acceleration) {
        acc = acceleration;
    }
    // onError: failed to get the acceleration
    var onError = function() {
        alert('failed to get the acceleration');
    }


    // animation loop
    var startAnim = function(a) {
        if(animated) {
            window.animId = window.requestAnimFrame(startAnim);
            update();
        }
    }
    var stopAnim = function() {
        animated = false;
        window.cancelAnimFrame(window.animId);
    }

    // update state
    var planted = false;
    var update = function() {
        /*
         * Player
         */
        // calculate angle
        state.prevAngle = state.angle;
        state.angle = model.calcAngle(state.angle, acc.x);
        window.playerRotateAngle = state.angle;
        window.playerRotateAngleDelta = (state.angle - state.prevAngle);

        /*
         * Trees
         */
        // calculate speed
        var kp = model.calcKantPressure(acc.y);
        state.Vy = model.Va(state.Vy, state.angle, kp, model.parameters.time);
        state.Vx = model.Vax(state.Vy, state.angle);

        // canvas translate coords
        var Sx = state.Vx * model.parameters.time * 10;
        var Sy = -state.Vy * model.parameters.time * 10 * 1.5;
        treeLayer.addToRender(function() {
            treeLayer.clear();
            treeLayer.translate(Math.round(Sx), Math.round(Sy));
        });

        // calculate score
        state.score += Math.round( Math.abs(Sy) / 5 );

        // generate new areas
        var sh = scene.getHeight();
        var sw = scene.getWidth();
        var offsetY = Math.abs(treeLayer.translation.y) % sh;
        //var offsetX = Math.abs(treeLayer.translation.x) % sw;
        
        if( offsetY <= sh / 2 )
            planted = false;
        if( offsetY > sh / 2 && !planted ) {
            plantTrees(
                treeLayer, 
                -sw, -treeLayer.translation.y - offsetY + 2 * sh, 
                sw, sh
            );
            plantTrees(
                treeLayer, 
                0, -treeLayer.translation.y - offsetY + 2 * sh, 
                sw, sh
            );
            plantTrees(
                treeLayer, 
                sw, -treeLayer.translation.y - offsetY + 2 * sh, 
                sw, sh
            );
            planted = true;
        }

        /*
         * Debug
         */
        // add debug text
        if(scene.debug) {
            debugLayer.addToRender(function() {
                debugLayer.clear();
                debugLayer.ctx.fillStyle = "#000000";
                debugLayer.ctx.fillText("acc.x: " + (acc.x).toFixed(5), 10, 80);
                //debugLayer.ctx.fillText("y: " + (acceleration.y).toFixed(5), 10, 40);
                //debugLayer.ctx.fillText("angle: " + (angle).toFixed(5), 10, 20);
                //debugLayer.ctx.fillText("delta: " + (angle - prevAngle).toFixed(5), 10, 80);
                //debugLayer.ctx.fillText("speed X: " + (Vx).toFixed(5), 10, 60);
                //debugLayer.ctx.fillText("layer X: " + treeLayer.position.x, 10, 80);
                //debugLayer.ctx.fillText("layer Y: " + treeLayer.position.y, 10, 100);
                //debugLayer.ctx.fillText("Sx: " + (Sx).toFixed(5), 10, 140);
                //debugLayer.ctx.fillText("Sy: " + (Sy).toFixed(5), 10, 160);
                debugLayer.ctx.fillText("Score: " + state.score, 10, 20);
                debugLayer.ctx.fillText("Objects: " + treeLayer._objectsList.length, 10, 40);
                debugLayer.ctx.fillText("Speed: " + (state.Vy).toFixed(5), 10, 60);

            });
        }

        // render layers
        scene.render();
    }

    

}
