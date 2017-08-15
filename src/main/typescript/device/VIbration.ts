/**
 * Device vibration
 *
 * @param duration vibration duration
 */
export default function(duration: number) {
    (<any>navigator).notification.vibrate(duration);
}