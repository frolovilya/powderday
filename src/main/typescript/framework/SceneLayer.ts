
export default class SceneLayer {

    public scene;

    private canvas;

    private ctx;

    private translation;

    public objectsList = [];

    private renderList = [];

    constructor(scene, canvas) {
        this.scene = scene;

        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        // keep the track of layer translation to get absolute coords
        this.translation = {
            x: 0,
            y: 0
        };
    }

    translate(x, y) {
        this.translation.x += x;
        this.translation.y += y;

        this.ctx.translate(x, y);
    }

    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    fitToSceneSize() {
        this.resize( this.scene.getWidth(), this.scene.getHeight() );
    }

    clear() {
        //this.resize(this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.restore();
    }

    addObject(object) {
        this.objectsList.push(object);
    }

    clearObjects() {
        this.objectsList.length = 0;
    }

    addToRender(callback) {
        this.renderList.push(callback);
    }

    render() {
        for(let i = 0; i < this.renderList.length; i++) {
            this.renderList[i](this.ctx);
        }
        this.renderList.length = 0;

        for(let i = 0; i < this.objectsList.length; i++) {
            let obj = this.objectsList[i];

            if(obj.isActual(this)) {
                // render if visible
                if(obj.isVisible(this)) {
                    obj.render(this);

                    // get object intersection points
                    let intersectPoints = obj.getIntersectionPoints(this);
                    for(let j = 0; j < intersectPoints.length; j++)
                        this.scene.intersections.addPoint(intersectPoints[j]);
                        //Scene.Intersections.addPoint(intersectPoints[j]);
                }

            } else {
                // delete object if it's not longer needed
                this.objectsList.splice(i, 1);
                i--;

            }
        }
    }

}
