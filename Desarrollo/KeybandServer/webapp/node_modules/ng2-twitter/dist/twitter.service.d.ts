import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { OAuthKey, OAuthToken } from './oauth.service';
export declare class TwitterService {
    private http;
    private authRequest;
    constructor(http: Http);
    get(url: string, query: any, oauthKey: OAuthKey, oauthToken: OAuthToken): Observable<Response>;
    post(url: string, params: any, oauthKey: OAuthKey, oauthToken: OAuthToken): Observable<Response>;
}
