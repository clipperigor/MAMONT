import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../../models/user';
import {MessageService} from '../../services/message.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private httpClient: HttpClient,
                private messageService: MessageService) {
        localStorage.removeItem('currentUser') ;
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));

        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        // console.log(email, password);
        // return null;
        return this.httpClient.post<any>(`/node/users`,
            { email, password })
            .pipe(map(user => {
                // login-form successful if there's a jwt token in the response

                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    // console.log(user, user.token);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.messageService.success('Вы авторизовались!');
                    this.currentUserSubject.next(user);
                } else {
                  this.messageService.error('Не верный логин или пароль!');
                  return null;
                }

                return user;
                // u:User ={};

            }));
    }

    logout() {
        // remove user from local storage to log user out
        // console.log('----logOut-----', localStorage.getItem('currentUser'));
        localStorage.removeItem('currentUser');
        // localStorage.removeItem('users');
        this.currentUserSubject.next(null);
    }

}
