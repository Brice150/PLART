import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminUsersModule } from './admin.users/admin.users.module';
import { AdminObjectsModule } from './admin.objects/admin.objects.module';
import { AdminMessagesModule } from './admin.messages/admin.messages.module';
import { HeaderModule } from '../header/header.module';



@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminUsersModule,
    AdminObjectsModule,
    AdminMessagesModule,
    HeaderModule
  ],
  exports : [AdminComponent]
})
export class AdminModule { }
