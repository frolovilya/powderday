import Circle from "../shapes/Circle";

export default class SceneIntersections {

    private intersectPoints = {};

    private intersectCallbacks = {};

    check() {
        // get callback classes
        for(let k in this.intersectCallbacks) {
            let classes = k.split(",");
            let fire = false;

            let a = this.intersectPoints[classes[0]];
            let b = this.intersectPoints[classes[1]];
            if(a == undefined || b == undefined)
                continue;

            for(let i = 0; i < a.length; i++) {
                fire = false;

                for(let j = 0; j < b.length; j++) {
                    // TODO: add point type check
                    if(Circle.checkCircles(a[i], b[j])) {
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

    addPoint(point: Circle) {
        if(this.intersectPoints[point.className] == undefined)
            this.intersectPoints[point.className] = [];

        this.intersectPoints[point.className].push(point);
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

    fireCallbacks(a: string, b: string) {
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