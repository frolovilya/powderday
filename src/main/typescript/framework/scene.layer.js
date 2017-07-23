/*
 * Layer
 */
Scene.Layer = function(scene, canvas) {
    this.scene = scene;

    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    // keep the track of layer translation to get absolute coords
    this.translation = {
        x: 0,
        y: 0
    };
    this.translate = function(x, y) {
        this.translation.x += x;
        this.translation.y += y;

        this.ctx.translate(x, y);
    }

    this.resize = function(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    this.fitToSceneSize = function() {
        this.resize( this.scene.getWidth(), this.scene.getHeight() );
    }

    this.clear = function() {
        //this.resize(this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.restore();
    }

    this._objectsList = [];
    this.addObject = function(object) {
        this._objectsList.push(object);
    }
    this.clearObjects = function() {
        this._objectsList.length = 0;
    }

    this._renderList = [];
    this.addToRender = function(callback) {
        this._renderList.push(callback);
    }

    this.render = function() {
        for(var i = 0; i < this._renderList.length; i++) {
            this._renderList[i](this.ctx);
        }
        this._renderList.length = 0;

        for(var i = 0; i < this._objectsList.length; i++) {
            var obj = this._objectsList[i];

            if(obj.isActual(this)) {
                // render if visible
                if(obj.isVisible(this)) {
                    obj.render(this);

                    // get object intersection points
                    var intersectPoints = obj.getIntersectionPoints(this);
                    for(var j = 0; j < intersectPoints.length; j++)
                        Scene.Intersections.addPoint(intersectPoints[j]);
                }

            } else {
                // delete object if it's not longer needed
                this._objectsList.splice(i, 1);
                i--;

            }
        }
    }
}
