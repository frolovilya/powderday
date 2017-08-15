import {InteractionType} from "scene/interactions/InteractionType";
import InteractionObserver from "scene/interactions/InteractionObserver";

type Callback = () => void
type ObserversMap = { [observerName: string]: InteractionObserver }

/**
 * Entry point for all Layer Objects interactions.
 *
 * Layer Objects may interact with each other.
 * @see InteractionType enum for all available interaction types.
 *
 * Interaction occurs by checking Layer Object's children Shapes
 * using selected InteractionType logic.
 */
export default class ObjectsInteractions {

    private observers: ObserversMap = {};

    /**
     * Check current state.
     *
     * This will notify all observers, if interaction occurs.
     *
     * @param state Redux state
     */
    public check(state) {
        let sceneObjectsRegistry = state.registry.objects;

        for(let observerName in this.observers) {
            this.observers[observerName].check(sceneObjectsRegistry);
        }
    }

    private getObserverName(interactionType: InteractionType, classNames) {
        return interactionType.toString() + "/" + classNames.sort().join("/");
    }

    /**
     * Subscribe to objects interaction.
     * Callback function will be called each time interaction occurs.
     *
     * @param interactionType
     * @param classNames class names of objects that participate in this interaction
     * @returns {(callback:Callback)=>void} InteractionObserver
     */
    public observe(interactionType: InteractionType, ...classNames) {
        let observerName = this.getObserverName(interactionType, classNames);

        if(this.observers[observerName] == undefined) {
            this.observers[observerName] = new InteractionObserver(interactionType, classNames);
        }

        return (callback: Callback) => {
            this.observers[observerName].addCallback(callback);
        };
    }

}