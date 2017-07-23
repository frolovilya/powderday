/*
 * Trees
 */
var TreeObject = function(treeResource, posX, posY) {
    this.img = new Image();
    this.img.src = treeResource.src;

    this.pos = {
        x: posX,
        y: posY
    }

    // sprite size
    //this.width = this.img.width;
    //this.height = this.img.height;
    //this.ratio = this.img.width / this.img.height;
    this.width = treeResource.size.width;
    this.height = treeResource.size.height;
    this.ratio = this.width / this.height;

    // resize sprite
    this.scaleNum = 1;
    this.scale = function(scaleNum) {
        this.scaleNum = scaleNum;
        this.width = this.width / scaleNum;
        this.height = this.height / scaleNum;
    }

    // intersection point
    this.point = treeResource.point;

    this.isPointVisible = function(layer, x, y) {
        return ( x > 0 && x < layer.scene.getWidth() 
            && y > 0 && y < layer.scene.getHeight() );
    }
}

TreeObject.prototype = new Scene.Object();

TreeObject.prototype.render = function(layer) {
    var ctx = layer.ctx;

    // draw circle
    ctx.beginPath();
    var iPoint = Scene.Intersections.Point.toLayerCoords(this.point, this.pos, this.scaleNum);
    ctx.arc(
        iPoint.x,
        iPoint.y,
        iPoint.radius, 
        0, 2 * Math.PI, false
    );
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#FFDBC9';
    ctx.stroke();
    ctx.closePath();
    
    // draw image
    ctx.beginPath();
    ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);
    ctx.closePath();
}

TreeObject.prototype.isVisible = function(layer) {
    var topX = layer.translation.x + this.pos.x;
    var topY = layer.translation.y + this.pos.y;

    return ( this.isPointVisible(layer, topX, topY) 
        || this.isPointVisible(layer, topX + this.width, topY)
        || this.isPointVisible(layer, topX, topY + this.height)
        || this.isPointVisible(layer, topX + this.width, topY + this.height) );
}

TreeObject.prototype.isActual = function(layer) {
    return layer.translation.y + this.pos.y + this.height > 0;
}

TreeObject.prototype.getIntersectionPoints = function(layer) {
    var absolutePoint = Scene.Intersections.Point.toAbsoluteCoords(layer, this.point, this.pos, this.scaleNum);
    absolutePoint.type = "circle";
    absolutePoint._class = "tree";

    return [absolutePoint];
}