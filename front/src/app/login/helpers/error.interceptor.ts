import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../services';

// Класс будет перехватывать все запросы приложения к серверу
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       // console.log('++++++error interceptor++++', );

        return next.handle(request)
          .pipe(catchError(err => {

            if (err.status === 401) {
                // auto logout if 401 response returned from api
                console.error('>>>>>>>Нет авторизации<<<<<<<<', err);
                this.authenticationService.logout();
                location.reload();
            }

            const error = err.statusText || err.error.message || err.error;
            return throwError(error);


        }))
          .pipe(source => {
            // console.log('>+++++>>>Любой запрос>>><<<', request.method);
            return next.handle(request);
          });

   }

}
