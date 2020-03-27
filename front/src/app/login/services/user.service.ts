import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`/node/users`);
    }

    getById(id: number) {
        return this.http.get(`/node/users/` + id);
    }

    register(user: User) {
        return this.http.post(`/node/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`/node/users/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`/node/users/` + id);
    }
}
