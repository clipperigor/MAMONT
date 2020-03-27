import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {CoursesService} from '../../services/courses.service';
import {MessageService} from '../../services/message.service';
import {HomeLib} from '../../constants/home-lib';
import {MatDialog, MatDialogConfig, MatMenuTrigger} from '@angular/material';
import {TreeFilesComponent} from '../tree-files/tree-files.component';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  @ViewChild(MatMenuTrigger) mainMenuTrigger: MatMenuTrigger;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  public TITLE: string;
  constructor(
    private breakpointObserver: BreakpointObserver,
    public coursesService: CoursesService,
    private messageService: MessageService,
    private zone: NgZone,
    private treeDialog: MatDialog) {
    this.TITLE = HomeLib.TITLE ;
  }

  ngOnInit(): void {
    this.coursesService.getListFiles();
   }

  showError() {
    this.messageService.error('Сервер описания курсов недоступен!');
  }

  getFile(path: string ) {
    console.log(path);
    this.coursesService.getFile(path);
  }
  getFileURL(url: string ) {
    this.coursesService.selectedData.push(url);
    this.zone.runOutsideAngular(() => {
      window.open('/python/getfile?path=' + url);
      // window.open('/python/getfile');
    });
  }

  treefiles() {
    console.log('---Tree----');
    const dialogConfig = new MatDialogConfig();
    // Конфигурация геометрии всплывающего окна
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      top: '50px',
      left: '100px'
    };
    // *Контейнер для диалоговых окон*
    // стиль должен быть размещен на самом верхнем уровне (см файл: styles.css)
    dialogConfig.panelClass = 'my-dialog';
    this.treeDialog.open(TreeFilesComponent, dialogConfig);
  }
}
