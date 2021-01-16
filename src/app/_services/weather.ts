import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Weather {

  constructor(private httpClient: HttpClient) { }

  getRawData(location: String): Observable<any> {
    const api = `https://wttr.in/${location}?format=3`;

    return this.httpClient.get(api,{ responseType: 'text' });    
  }

}