export default class SceneIntersectionsPoint {

    static toLayerCoords(spritePoint, spritePosition, spriteScale) {
        let newPoint = JSON.parse( JSON.stringify(spritePoint) );

        newPoint.x = spritePosition.x + newPoint.x / spriteScale;
        newPoint.y = spritePosition.y + newPoint.y / spriteScale;

        return newPoint;
    }

    static toAbsoluteCoords(layer, spritePoint, spritePosition, spriteScale) {
        let newPoint = SceneIntersectionsPoint.toLayerCoords(spritePoint, spritePosition, spriteScale);

        newPoint.x += layer.translation.x;
        newPoint.y += layer.translation.y;

        return newPoint;
    }

}