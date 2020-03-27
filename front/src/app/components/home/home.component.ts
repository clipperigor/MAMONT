import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {CourcesContentComponent} from './cources-content/cources-content.component';
class Topics {
  topic: string;
  content: string;
}
class URLRefs {
  ref: string;
  value: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public refs: URLRefs[] = [
    {ref: 'ftp://46.160.200.179:21', value: 'Материалы для студентов текущего курса'},
    {ref: 'https://www.youtube.com/channel/UCiUYF0R_ttUKe3gKN6aWy5A', value: 'Лекции на канале YouTube'},
    {ref: 'https://www.youtube.com/user/MironchikVideo', value: 'Старый (закрытый) канал YouTube'},

      ];
    public topics: Topics[] = [
      { topic: 'Oracle - PL/SQL, SQL, - разработка PL/SQL конструкций и запросов', content: 'Курсы Oracle'},
      {topic: 'Языки программирования Java, JavaScript (ECMAScript) - NodeJS, Python', content: 'Курсы по Python'},
      { topic: 'Разработка WEB приложений - ReactJS, Angular,Java Server Faces (JSF), Application Development Framework (ADF)',
        content: 'Курсы По разработке Web приложений'},
      {topic: 'Администрирование баз данных Oracle, Postgresql', content: 'Курсы по администрированию серверов баз данных, настройка серверов'},
      { topic: 'Администрирование серверов приложений Oracle Weblogic, IBM Sphere, RedHat Jboss-Wildfly', content: 'Курсы по администрированию серверов приложений'},
      {topic: 'Разработка корпоративных отчетов - Oracle BI', content: 'Курсы по разработке информационных витрин и отчетов в среде Oracle BI'},
      {topic: 'Разработка курсов под требования заказчика', content: 'Курсы, содержание которых определяет заказчик'},
      {topic: 'Проведение курсов на площадке клиента', content: 'Курсы, которые проводятся на площадке клиента'},
    ];
    topicName = '';
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  getTopicInfo(i: number) {
    // console.log(this.topics[i].content);
    const dialogConfig = new MatDialogConfig();
    // окно будет не модальным
    dialogConfig.disableClose = false;

    dialogConfig.autoFocus = true;
    // Конфигурация геометрии всплывающего окна
    dialogConfig.position = {
      top: '10px',
      left: '100px'
    };
    dialogConfig.data = this.topics[i].content;

    this.dialog.open(CourcesContentComponent, dialogConfig);
  }

}
