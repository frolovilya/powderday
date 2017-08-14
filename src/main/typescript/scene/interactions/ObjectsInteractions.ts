import {InteractionType} from "scene/interactions/InteractionType";
import InteractionObserver from "scene/interactions/InteractionObserver";

type Callback = () => void
type ObserversMap = { [observerName: string]: InteractionObserver }

export default class ObjectsInteractions {

    private observers: ObserversMap = {};

    public check(state) {
        let sceneObjectsRegistry = state.registry.objects;

        for(let observerName in this.observers) {
            this.observers[observerName].check(sceneObjectsRegistry);
        }
    }

    private getObserverName(interactionType: InteractionType, classNames) {
        return interactionType.toString() + "/" + classNames.sort().join("/");
    }

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