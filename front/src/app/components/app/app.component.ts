import {Component, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TimeService} from '../../services/time.service';
// tslint:disable-next-line:import-spacing
import {HomeLib}  from '../../constants/home-lib';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../login/services';
import {User} from '../../models/user';
import {MainMenuComponent} from '../main-menu/main-menu.component';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';
import {MatMenuTrigger} from '@angular/material';
import {InfoServerClientComponent} from "../info-server-client/info-server-client.component";





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  public TITLE: string;
  public currentUser: User ;
  constructor(
    private breakpointObserver: BreakpointObserver,
    public timeService: TimeService, private zone: NgZone,
              // Подгружаем всплывающее окно
    private snackBar: MatSnackBar,
      // Навигатор
    private router: Router,
    // Подгружаем аутентификацию
    private authenticationService: AuthenticationService) {
    // this.currentUser = new User();
    localStorage.serverInfo = {};
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      this.TITLE = HomeLib.TITLE ;
      // console.log('=====>>>>', x.firstName, x.lastName);
    });
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {

  }

  ngOnDestroy(): void {
     this.timeService.destroy();
  }
// Вызов внешних приложений в отдельной закладке
  goTimeTable() {
    this.zone.runOutsideAngular(() => {
      window.open(HomeLib.URL_GRAFIC );
    });
  }
// Простое всплывающее однострочное окно
  // 'mat-primary','mat-accent','mat-toolbar'
  // openServerInfo() {
  //   this.snackBar.open('Server info', this.timeService.getServerInfo(), {
  //     duration: 2000, horizontalPosition: 'right', verticalPosition: 'top',
  //     panelClass: ['infoPanel' ]
  //   });
  //
  // }
  // Всплывющее многострочное окно на основе компоненты
  openServerInfo() {
    this.snackBar.openFromComponent(InfoServerClientComponent,  {
      duration: 20000, horizontalPosition: 'right', verticalPosition: 'top',
      panelClass: ['infoPanel' ]
    });

  }

}




