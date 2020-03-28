import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './components/about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatProgressSpinnerModule, MatMenuModule, MatProgressBarModule,
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {TimeService} from './services/time.service';
import { ContactsComponent } from './components/contacts/contacts.component';
import { CourcesContentComponent } from './components/home/cources-content/cources-content.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {HttpClientModule, HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';

// used to create fake backend
import { usersBackendProvider } from './login/helpers';

import { AppComponent } from './components/app/app.component';
// import { routing } from './app.routing';

import { AlertComponent } from './login/components';
import { JwtInterceptor, ErrorInterceptor } from './login/helpers';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './login/login-form/login.component';
import { RegisterComponent } from './login/register-form';
import {ReactiveFormsModule} from '@angular/forms';
import { MamontComponent } from './components/mamont/mamont.component';
import {MamontsensorsService} from './services/mamontsensors.service';
import { UserFullnamePipe } from './pipes/user-fullname.pipe';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import {MatTreeModule} from '@angular/material/tree';
import { NotFoundComponent } from './components/not-found/not-found.component';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatVideoModule } from 'mat-video';
import { PlayerVideoComponent } from './components/player-video/player-video.component';
import {InfoServerClientComponent} from './components/info-server-client/info-server-client.component';
import { TreeFilesVideoComponent } from './components/tree-files-video/tree-files-video.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
     ContactsComponent,
     CourcesContentComponent,
     LoginComponent,
      AlertComponent,
      RegisterComponent,
      MamontComponent,
      UserFullnamePipe,
      MainMenuComponent,

      NotFoundComponent,
      PlayerVideoComponent,
      InfoServerClientComponent,
      TreeFilesVideoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    // Поддержка дерева
    MatTreeModule,
    // Модули для всплывающих окон
    MatDialogModule,
    MatPaginatorModule,
    DragDropModule,
    MatSnackBarModule,
    ReactiveFormsModule,

    ReactiveFormsModule,
    HttpClientModule,

    MatSidenavModule,
    MatMenuModule, MatButtonModule, MatTreeModule, MatProgressBarModule,
    // Модули для проигрывания видео
    BrowserAnimationsModule,
    MatVideoModule
  ],
  providers: [TimeService,
      // Подключаем ловушки для http запросов
       { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

      // Другой способ подключения HTTP провайдера
      // Параметры подключения описаны в самом классе при экспорте
      usersBackendProvider,
  MamontsensorsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
