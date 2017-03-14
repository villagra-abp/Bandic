import { EventEmitter, NgZone } from '@angular/core';
/**
 * CKEditor component
 * Usage :
 *  <ckeditor [(ngModel)]="data" [config]="{...}" debounce="500"></ckeditor>
 */
export declare class CKEditorComponent {
    config: any;
    debounce: any;
    change: EventEmitter<{}>;
    ready: EventEmitter<{}>;
    blur: EventEmitter<{}>;
    focus: EventEmitter<{}>;
    host: any;
    _value: string;
    instance: any;
    debounceTimeout: any;
    zone: any;
    /**
     * Constructor
     */
    constructor(zone: NgZone);
    value: any;
    /**
     * On component destroy
     */
    ngOnDestroy(): void;
    /**
     * On component view init
     */
    ngAfterViewInit(): void;
    /**
     * Value update process
     */
    updateValue(value: any): void;
    /**
     * CKEditor init
     */
    ckeditorInit(config: any): void;
    /**
     * Implements ControlValueAccessor
     */
    writeValue(value: any): void;
    onChange(_: any): void;
    onTouched(): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
