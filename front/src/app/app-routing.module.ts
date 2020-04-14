import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AboutComponent} from './components/about/about.component';
import {ContactsComponent} from './components/contacts/contacts.component';
import {LoginComponent} from './login/login-form/login.component';
import {AuthGuard} from './login/guards';
import {RegisterComponent} from './login/register-form';
import {MamontComponent} from './components/mamont/mamont.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {TreeFilesVideoComponent} from './components/tree-files-video/tree-files-video.component';
import {NewsComponent} from './components/news/news.component';
import {WebinarComponent} from './components/webinar/webinar.component';


// const routes: Routes = [{path: '', redirectTo: 'home' , pathMatch: 'full'},
const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'about', component: AboutComponent },
  {path: 'contacts', component: ContactsComponent,  canActivate: [AuthGuard]},
  {path: 'mamont', component: MamontComponent, canActivate: [AuthGuard] },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent },
  {path: 'treevideo', component: TreeFilesVideoComponent },
  {path: 'webinar', component: WebinarComponent },
  {path: 'news', component: NewsComponent },
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
