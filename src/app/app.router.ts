import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ConnectComponent } from './connect/connect.component';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { ObjectsComponent } from './objects/objects.component';
import { UserComponent } from './user/user.component';
import { ErrorPathComponent } from './error-path/error-path.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'objects', component: ObjectsComponent },
  { path: 'user', component: UserComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'connect', component: ConnectComponent },
  { path: 'logout', component: ConnectComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: ErrorPathComponent },
];

export const appRouter = RouterModule.forRoot(routes);
