import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';

@Injectable()
export class FileUploadService {
/**
 * @param Observable<number>
 */
private progress$: Observable<number>;

/**
 * @type {number}
 */
private progress: number = 0;

private progressObserver: any;

constructor () {
    this.progress$ = new Observable(observer => {
        this.progressObserver = observer
    });
}

/**
 * @returns {Observable<number>}
 */
public getObserver (): Observable<number> {
    return this.progress$;
}

/**
 * Upload files through XMLHttpRequest
 *
 * @param url
 * @param files
 * @returns {Promise<T>}
 */

public upload (id: string, type: string, files: File[], method: string): Promise<any> {
    return new Promise((resolve, reject) => {
        let formData: FormData = new FormData(),
            xhr: XMLHttpRequest = new XMLHttpRequest();
        let url = "http://localhost/keyband/Desarrollo/KeybandServer/rest/upload.php?id="+id+"&&RRSS="+type+"&&method="+method;
        
        if(files != undefined) {
            for (let i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i].name);
            }
        }

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                } else {
                    reject(xhr.response);
                }
            }
        };

        FileUploadService.setUploadUpdateInterval(200);
        xhr.upload.onprogress = (event) => {
            this.progress = Math.round(event.loaded / event.total * 100);

            this.progressObserver.next(this.progress);
        };

        xhr.open('POST', url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(formData);
    });
}

/**
 * Set interval for frequency with which Observable inside Promise will share data with subscribers.
 *
 * @param interval
 */
private static setUploadUpdateInterval (interval: number): void {
    setInterval(() => {}, interval);
}
}