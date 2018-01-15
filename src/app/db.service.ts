import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DbService {

  constructor(private http: HttpClient) {}

  public getDeviceStatus(jsession: string, vehiIdno: string): Observable<any> {
    const url = 'http://139.159.212.154:88/StandardApiAction_getDeviceStatus.action?' +
      'jsession=' + jsession +
      '&vehiIdno=' + vehiIdno +
      '&toMap=2&geoaddress=1';
    return this.http.get(url);
  }

}
