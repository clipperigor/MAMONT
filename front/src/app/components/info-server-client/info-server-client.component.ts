import {Component, OnInit} from '@angular/core';
import {OS, User} from '../../models/user';
import {TimeService} from '../../services/time.service';
import {MatSnackBarRef} from '@angular/material/snack-bar';
import {AppComponent} from '../app/app.component';
import {Agent} from '../../models/agent';
import {InfoClient} from '../../utilites/info-client';

// Компонент, который будет встроен в окно
@Component({
    selector: 'app-info-server',
    templateUrl: 'info-server-client.component.html',
    styles: ['']
})
///////////////////////////////////////////////
export class InfoServerClientComponent implements OnInit {
    data: any = {};
    usr: User = localStorage.currentUser;
    agent: Agent;
    clientInfo: OS;

    // Через конструктор получаем ссылку на контейнер всплывающего окна
    constructor(private timeService: TimeService, private snackAppRef: MatSnackBarRef<AppComponent>) {

    }

    // Закрыть всплывающее окно
    close() {
        this.snackAppRef.dismiss();
    }

    ngOnInit(): void {
        // Получаем информацию о базе данных
        this.data = this.timeService.getServerData();
        // Получаем информацию о броузере и операционной системе
        // где работает приложение
        this.clientInfo = {
            os: InfoClient.getOS(),
            osByFonts: InfoClient.getOSbyFonts(),
        };
        this.agent = InfoClient.getBrowserName();
    }


}


