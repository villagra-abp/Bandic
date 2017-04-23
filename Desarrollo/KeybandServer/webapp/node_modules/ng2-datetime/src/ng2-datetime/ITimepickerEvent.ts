export interface ITimepickerEvent {
    time: {
        value: number, // getTime()
        meridian: string, // AM || PM
        hours: number,
        minutes: number,
        seconds: number
    };
}
