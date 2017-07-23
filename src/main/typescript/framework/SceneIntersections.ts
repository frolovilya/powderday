export default class SceneIntersections {

    private intersectPoints = {};

    private intersectCallbacks = {};

    checkCircles(c1, c2) {
        let d = Math.sqrt( Math.pow(c2.x - c1.x, 2) + Math.pow(c2.y - c1.y, 2) );

        return d <= (c1.radius + c2.radius);
    }

    check() {
        var classes = [];
        var fire = false;

        // get callback classes
        for(let k in this.intersectCallbacks) {
            classes = k.split(",");

            let a = this.intersectPoints[classes[0]];
            let b = this.intersectPoints[classes[1]];
            if(a == undefined || b == undefined)
                continue;

            for(let i = 0; i < a.length; i++) {
                fire = false;

                for(let j = 0; j < b.length; j++) {
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
    }

    addPoint(point) {
        let _class = point._class;

        if(this.intersectPoints[_class] == undefined)
            this.intersectPoints[_class] = [];

        this.intersectPoints[_class].push(point);
    }

    clearPoints() {
        this.intersectPoints = {};
    }

    onIntersect(a: string, b: string, callback) {
        let id = [a, b].sort().join(",");

        console.log("onIntersect: " + id);

        if(this.intersectCallbacks[id] == undefined)
            this.intersectCallbacks[id] = [];

        this.intersectCallbacks[id].push(callback);
    }

    fireCallbacks(a, b) {
        let id = [a, b].sort().join(",");

        if(this.intersectCallbacks[id] == undefined)
            return;

        let cb = this.intersectCallbacks[id];
        for(let i = 0; i < cb.length; i++) {
            cb[i]();
        }

        //this.intersectCallbacks[id].length = 0;
    }

}