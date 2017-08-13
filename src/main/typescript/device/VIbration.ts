export default function(duration: number) {
    (<any>navigator).notification.vibrate(duration);
}