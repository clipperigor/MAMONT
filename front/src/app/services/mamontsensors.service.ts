import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MamontsensorsService {
  private _data: any = {};
  private _error = '';

  get data(): any {
    return this._data;
  }

  get error(): string {
    return this._error;
  }
  private REST_SERVER = '/node/mamontsensors';


  constructor(private httpClient: HttpClient) {

  }
  getSensorsData() {
    this._error = '';
    this.httpClient.get(this.REST_SERVER).subscribe((data: any) => {
      // console.log('request');
      this._data = data;

    }, (err) => {
      console.error('>>>>>>Error<<<<<', err);
      this._error =  err.toString() ;
    }, () => {
      // console.log('Ok', new Date().toLocaleTimeString());
    });


  }
}
