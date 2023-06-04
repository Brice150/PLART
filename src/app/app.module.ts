import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { appRouter } from './app.router';
import { UserModule } from './user/user.module';
import { ObjectsModule } from './objects/objects.module';
import { MessagesModule } from './messages/messages.module';
import { HomeModule } from './home/home.module';
import { ConnectModule } from './connect/connect.module';
import { AdminModule } from './admin/admin.module';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

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
    MatDialogModule,
    ToastrModule.forRoot()
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppModule { }
