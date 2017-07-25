export default class Vibration {

    static vibrate(duration: number) {
        (<any>navigator).notification.vibrate(duration);
    }

}