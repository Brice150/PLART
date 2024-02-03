import { RouterModule, Routes } from '@angular/router';
import { ConnectComponent } from './connect/connect.component';
import { HomeComponent } from './home/home.component';
import { ErrorPathComponent } from './error-path/error-path.component';
import { AuthGuard } from './core/auth.guard';
import { ObjectsComponent } from './objects/objects.component';
import { UserComponent } from './user/user.component';
import { MessagesComponent } from './messages/messages.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'objects', component: ObjectsComponent },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'messages',
    component: MessagesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
  },
  { path: 'connect', component: ConnectComponent },
  { path: 'logout', component: ConnectComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: ErrorPathComponent },
];

export const appRouter = RouterModule.forRoot(routes);
