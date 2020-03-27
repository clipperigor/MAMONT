import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {AuthenticationService} from '../login/services';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  private REST_SERVER = '/node/info';
  private data: any = {};
  private infoTimer: number;

  constructor(public httpClient: HttpClient) {
    // Передаем контекст выполнения в метод , обратного вызова
    // для обеспечения доступа к переменным экземпляра
    this.getInfo = this.getInfo.bind(this);
    // первоначальное отображение времени
    this.getInfo();
    // теперь информации о БД будет периодически обновляться
    this.infoTimer = setInterval(this.getInfo, 60000);
  }

  private getInfo() {
    // console.log('Send request /info-----', new Date().toLocaleTimeString());
    this.httpClient.get(this.REST_SERVER).subscribe((data: any) => {
      // console.log('request');
      this.data = data;

    }, (err) => {
      console.error('>>>>>>Error<<<<<', err);
      this.data.now =  err.toString() ;
    }, () => {
      // console.log('Ok', new Date().toLocaleTimeString());
    });
  }


  public getServerData(): any {
    return this.data;
   // return localStorage.serverInfo.now;
  }
  destroy() {
    console.log('Timer cleared!!!!');
    clearInterval(this.infoTimer);
  }
}
