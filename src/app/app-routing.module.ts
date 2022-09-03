import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppComponentAdmin } from './admin.component/admin.component';
import { AppComponent } from './app.component/app.component';
import { AppComponentConnect } from './connect.component/connect.component';
import { AppComponentLogin } from './connect.component/login.component/login.component';
import { AppComponentRegister } from './connect.component/register.component/register.component';
import { AppComponentHeader } from './header.component/header.component';
import { AppComponentHome } from './home.component/home.component';
import { AppComponentMessages } from './messages.component/messages.component';
import { AppComponentObjects } from './objects.component/objects.component';
import { AppComponentUser } from './user.component/user.component';

const routes: Routes = [
  {path: 'home', component: AppComponentHome},
  {path: 'objects', component: AppComponentObjects},
  {path: 'user', component: AppComponentUser},
  {path: 'messages', component: AppComponentMessages},
  {path: 'admin', component: AppComponentAdmin},
  {path: 'connect', component: AppComponentConnect},
  {path: 'logout', component: AppComponentConnect},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  AppComponent, 
  AppComponentConnect,
  AppComponentLogin,
  AppComponentRegister,
  AppComponentHeader,
  AppComponentHome,
  AppComponentObjects,
  AppComponentUser,
  AppComponentMessages,
  AppComponentAdmin]
