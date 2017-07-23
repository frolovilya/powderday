export default class Circle {

    type = "circle";

    className: string;

    x: number;
    y: number;
    radius: number;

    static checkCircles(c1: Circle, c2: Circle): boolean {
        let diameter = Math.sqrt( Math.pow(c2.x - c1.x, 2) + Math.pow(c2.y - c1.y, 2) );

        return diameter <= (c1.radius + c2.radius);
    }

    static toLayerCoords(spritePoint, spritePosition, spriteScale) {
        let circle = new Circle();

        let point = JSON.parse( JSON.stringify(spritePoint) );
        circle.x = spritePosition.x + point.x / spriteScale;
        circle.y = spritePosition.y + point.y / spriteScale;
        circle.radius = point.radius;

        return circle;
    }

    static toAbsoluteCoords(layer, spritePoint, spritePosition, spriteScale) {
        let circle = new Circle();

        let point = Circle.toLayerCoords(spritePoint, spritePosition, spriteScale);
        circle.x = point.x + layer.translation.x;
        circle.y = point.y + layer.translation.y;
        circle.radius = point.radius;

        return circle;
    }

}