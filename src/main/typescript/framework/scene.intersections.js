Scene.Intersections = {

	checkCircles: function(c1, c2) {
		var d = Math.sqrt( Math.pow(c2.x - c1.x, 2) + Math.pow(c2.y - c1.y, 2) );

		return d <= (c1.radius + c2.radius);
	},

	check: function() {
		var classes = [];
		var fire = false;

		// get callback classes
		for(var k in this._intersectCallbacks) {
			classes = k.split(",");

			var a = this._intersectPoints[classes[0]];
			var b = this._intersectPoints[classes[1]];
			if(a == undefined || b == undefined) 
				continue;

			for(var i = 0; i < a.length; i++) {
				fire = false;

				for(var j = 0; j < b.length; j++) {
					// TODO: add point type check
					if(this.checkCircles(a[i], b[j])) {
						fire = true;
						break;
					}
				}

				if(fire) {
					this.fireCallbacks(classes[0], classes[1]);
					break;
				}
			}
		}
	},

	_intersectPoints: {},
	addPoint: function(point) {
		var _class = point._class;

		if(this._intersectPoints[_class] == undefined)
			this._intersectPoints[_class] = [];

		this._intersectPoints[_class].push(point);
	},

	clearPoints: function() {
		this._intersectPoints = {};
	},

	_intersectCallbacks: {},
	onIntersect: function(a, b, callback) {
		var id = [a, b].sort();

		if(this._intersectCallbacks[id] == undefined)
			this._intersectCallbacks[id] = [];

		this._intersectCallbacks[id].push(callback);
	},

	fireCallbacks: function(a, b) {
		var id = [a, b].sort();

		if(this._intersectCallbacks[id] == undefined)
			return;

		var cb = this._intersectCallbacks[id];
		for(var i = 0; i < cb.length; i++) {
			cb[i]();
		}

		//this._intersectCallbacks[id].length = 0;
	}

}

Scene.Intersections.Point = {
	toLayerCoords: function(spritePoint, spritePosition, spriteScale) {
		var newPoint = JSON.parse( JSON.stringify(spritePoint) );

		newPoint.x = spritePosition.x + newPoint.x / spriteScale;
		newPoint.y = spritePosition.y + newPoint.y / spriteScale;

		return newPoint;
	},

	toAbsoluteCoords: function(layer, spritePoint, spritePosition, spriteScale) {
		var newPoint = this.toLayerCoords(spritePoint, spritePosition, spriteScale);

		newPoint.x += layer.translation.x;
		newPoint.y += layer.translation.y;

		return newPoint;
	}
}