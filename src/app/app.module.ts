import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule }from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { appRouter } from './app.router';
import { UserModule } from './user/user.module';
import { ObjectsModule } from './objects/objects.module';
import { MessagesModule } from './messages/messages.module';
import { HomeModule } from './home/home.module';
import { ConnectModule } from './connect/connect.module';
import { AdminModule } from './admin/admin.module';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    BrowserModule,
    appRouter,
    UserModule,
    ObjectsModule,
    MessagesModule,
    HomeModule,
    ConnectModule,
    AdminModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    ToastrModule.forRoot()
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
