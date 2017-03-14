import {
    Component, Output, Input, EventEmitter, HostListener, AfterViewInit, OnDestroy,
    SimpleChanges, OnChanges
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { ITimepickerEvent } from './ITimepickerEvent';

@Component({
    selector: 'datetime',
    template: `
        <div class="form-inline ng2-datetime">
            <div class="input-group date">
                <input id="{{idDatePicker}}" type="text" class="form-control"
                       [attr.readonly]="readonly"
                       [attr.required]="required"
                       [attr.placeholder]="datepickerOptions.placeholder || 'Choose date'"
                       [(ngModel)]="dateModel"
                       (keyup)="checkEmptyValue($event)"/>
                <div [hidden]="datepickerOptions.hideIcon || datepickerOptions === false || false"
                     (click)="showDatepicker()"
                     class="input-group-addon">
                    <span [ngClass]="datepickerOptions.icon || 'glyphicon glyphicon-th'"></span>
                </div>
            </div>
            <div class="input-group bootstrap-timepicker timepicker">
                <input id="{{idTimePicker}}" type="text" class="form-control input-small"
                       [attr.readonly]="readonly"
                       [attr.required]="required"
                       [attr.placeholder]="timepickerOptions.placeholder || 'Set time'"
                       [(ngModel)]="timeModel"
                       (focus)="showTimepicker()"
                       (keyup)="checkEmptyValue($event)">
                <span [hidden]="timepickerOptions.hideIcon || false" class="input-group-addon">
                    <i [ngClass]="timepickerOptions.icon || 'glyphicon glyphicon-time'"></i>
                </span>
            </div>
            <button *ngIf="hasClearButton" type="button" (click)="clearModels()">Clear</button>
        </div>
    `,
    styles: [
        '.ng2-datetime *[hidden] { display: none; }'
    ]
})

export class NKDatetime implements ControlValueAccessor, AfterViewInit, OnDestroy, OnChanges {
    @Output() dateChange: EventEmitter<Date> = new EventEmitter<Date>();
    @Input('timepicker') timepickerOptions: any = {};
    @Input('datepicker') datepickerOptions: any = {};
    @Input('hasClearButton') hasClearButton: boolean = false;
    @Input() readonly: boolean = null;
    @Input() required: boolean = null;

    date: Date; // ngModel
    dateModel: string;
    timeModel: string;

    // instances
    datepicker: any;
    timepicker: any;

    idDatePicker: string = uniqueId('q-datepicker_');
    idTimePicker: string = uniqueId('q-timepicker_');

    @HostListener('dateChange', ['$event'])
    onChange = (_: any) => {
    }
    onTouched = () => {
    }

    constructor(ngControl: NgControl) {
        ngControl.valueAccessor = this; // override valueAccessor
    }

    ngAfterViewInit() {
        this.init();
    }

    ngOnDestroy() {
        if (this.datepicker) {
            this.datepicker.datepicker('destroy');
        }
        if (this.timepicker) {
            this.timepicker.timepicker('remove');
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes) {
            if (changes['datepickerOptions'] && this.datepicker) {
                this.datepicker.datepicker('destroy');

                if (changes['datepickerOptions'].currentValue) {
                    this.datepicker = null;
                    this.init();
                } else if (changes['datepickerOptions'].currentValue === false) {
                    this.datepicker.remove();
                }
            }
            if (changes['timepickerOptions'] && this.timepicker) {
                this.timepicker.timepicker('remove');

                if (changes['timepickerOptions'].currentValue) {
                    this.timepicker = null;
                    this.init();
                } else if (changes['timepickerOptions'].currentValue === false) {
                    this.timepicker.parent().remove();
                }
            }
        }
    }

    writeValue(value: any): void {
        this.date = value;
        if (isDate(this.date)) {
            setTimeout(() => {
                this.updateModel(this.date);
            }, 0);
        } else {
            this.clearModels();
        }
    }

    registerOnChange(fn: (_: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    checkEmptyValue(e: any) {
        const value = e.target.value;
        if (value === '' && (
                this.timepickerOptions === false ||
                this.datepickerOptions === false ||
                (this.timeModel === '' && this.dateModel === '')
            )) {
            this.dateChange.emit(null);
        }
    }

    clearModels() {
        this.dateChange.emit(null);
        if (this.timepicker) {
            this.timepicker.timepicker('setTime', null);
        }
        this.updateDatepicker(null);
    }

    showTimepicker() {
        this.timepicker.timepicker('showWidget');
    }

    showDatepicker() {
        this.datepicker.datepicker('show');
    }

    //////////////////////////////////

    private init(): void {
        if (!this.datepicker && this.datepickerOptions !== false) {
            let options = jQuery.extend({ enableOnReadonly: !this.readonly }, this.datepickerOptions);
            this.datepicker = (<any>$('#' + this.idDatePicker)).datepicker(options);
            this.datepicker
                .on('changeDate', (e: any) => {
                    let newDate: Date = e.date;

                    if (isDate(this.date) && isDate(newDate)) {
                        // get hours/minutes
                        newDate.setHours(this.date.getHours());
                        newDate.setMinutes(this.date.getMinutes());
                        newDate.setSeconds(this.date.getSeconds());
                    }

                    this.date = newDate;
                    this.dateChange.emit(newDate);
                });
        } else if (this.datepickerOptions === false) {
            (<any>$('#' + this.idDatePicker)).remove();
        }

        if (!this.timepicker && this.timepickerOptions !== false) {
            let options = jQuery.extend({ defaultTime: false }, this.timepickerOptions);
            this.timepicker = (<any>$('#' + this.idTimePicker)).timepicker(options);
            this.timepicker
                .on('changeTime.timepicker', (e: ITimepickerEvent) => {
                    let { meridian, hours } = e.time;

                    if (meridian) {
                        // has meridian -> convert 12 to 24h
                        if (meridian === 'PM' && hours < 12) {
                            hours = hours + 12;
                        }
                        if (meridian === 'AM' && hours === 12) {
                            hours = hours - 12;
                        }
                        hours = parseInt(this.pad(hours));
                    }

                    if (!isDate(this.date)) {
                        this.date = new Date();
                        this.updateDatepicker(this.date);
                    }

                    this.date.setHours(hours);
                    this.date.setMinutes(e.time.minutes);
                    this.date.setSeconds(e.time.seconds);
                    this.dateChange.emit(this.date);
                });
        } else if (this.timepickerOptions === false) {
            (<any>$('#' + this.idTimePicker)).parent().remove();
        }

        this.updateModel(this.date);
    }

    private updateModel(date: Date): void {
        this.updateDatepicker(date);

        // update timepicker
        if (this.timepicker !== undefined && isDate(date)) {
            let hours = date.getHours();
            if (this.timepickerOptions.showMeridian) {
                // Convert 24 to 12 hour system
                hours = (hours === 0 || hours === 12) ? 12 : hours % 12;
            }
            const meridian = date.getHours() >= 12 ? ' PM' : ' AM';
            const time =
                this.pad(hours) + ':' +
                this.pad(this.date.getMinutes()) + ':' +
                this.pad(this.date.getSeconds()) +
                (this.timepickerOptions.showMeridian || this.timepickerOptions.showMeridian === undefined
                    ? meridian : '');
            this.timepicker.timepicker('setTime', time);
            this.timeModel = time; // fix initial empty timeModel bug
        }
    }

    private updateDatepicker(date?: any) {
        if (this.datepicker !== undefined) {
            this.datepicker.datepicker('update', date);
        }
    }

    private pad(value: any): string {
        return value.toString().length < 2 ? '0' + value : value.toString();
    }
}

let id = 0;
function uniqueId(prefix: string): string {
    return prefix + ++id;
}

function isDate(obj: any) {
    return Object.prototype.toString.call(obj) === '[object Date]';
}
