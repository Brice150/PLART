import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule }from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import {MatChipsModule} from '@angular/material/chips';
import { appRouter } from './app.router';
import { UserModule } from './user/user.module';
import { ObjectsModule } from './objects/objects.module';
import { MessagesModule } from './messages/messages.module';
import { HomeModule } from './home/home.module';
import { ConnectModule } from './connect/connect.module';
import { AdminModule } from './admin/admin.module';

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
    MatDialogModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
