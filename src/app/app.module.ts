import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { appRouter } from './app.routes';
import { ConnectModule } from './connect/connect.module';
import { HomeModule } from './home/home.module';
import { MessagesModule } from './messages/messages.module';
import { ObjectsModule } from './objects/objects.module';
import { UserModule } from './user/user.module';

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
    ToastrModule.forRoot(),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
