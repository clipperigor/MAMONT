import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CourseContent} from '../models/course-content';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  get selectedData(): string[] {
    return this._selectedData;
  }

  set selectedData(value: string[]) {
    this._selectedData = value;
  }

  private REST_SERVER_COURSES = '/python/courses';
  private REST_SERVER_COURSE = '/python/coursefile';

  get data(): any {
    return this._data;
  }

  get error(): string {
    return this._error;
  }
  // tslint:disable-next-line:variable-name
  private _data: [CourseContent]  ;
  // tslint:disable-next-line:variable-name
  private _selectedData: string[]  ;
  // tslint:disable-next-line:variable-name
  private _error = '';

  constructor(private httpClient: HttpClient) {
    this._selectedData = [] ;
  }

  getListFiles() {
    this._error = '';
    this.httpClient.get(this.REST_SERVER_COURSES).subscribe((data: any) => {
      // console.log('request', data);

      data[0].name = 'Список читаемых курсов';
      data[0].start = true;
      this._data = data;

    }, (err) => {
      console.error('>>>>>>Error<<<<<', err);
      this._data = [{name: 'Ошибка сервера описания курсов', path: 'Ошибка сервера курсов', directory: false, start: false}];
      this._error =  err.toString() ;
    }, () => {
      // console.log('Ok', new Date().toLocaleTimeString());
    });


  }

  getFile(doc: string) {
    this._error = '';
    const head: HttpHeaders = new HttpHeaders();
    // head.set('Content-Type', 'application/json');
    head.set('Content-Type', 'application/octet-stream');
    this.httpClient.post<any>(this.REST_SERVER_COURSE, {pathdoc: doc}, {headers: head})
      .subscribe((data: any) => {
      console.log('=====ok=====' + data.content);
    }, (err) => {
      console.error('>>>>>>Error<<<<<-----', err, doc);
    }, () => {
       console.log('Ok', new Date().toLocaleTimeString());
    });


  }


}
