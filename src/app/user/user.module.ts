import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserObjectsAddModule } from './user.objects.add/user.objects.add.module';
import { UserObjectsModule } from './user.objects/user.objects.module';
import { UserObjectsModifyModule } from './user.objects.modify/user.objects.modify.module';
import { AccountDeleteModule } from './account.delete/account.delete.module';
import { AccountModifyModule } from './account.modify/account.modify.module';
import { HeaderModule } from '../header/header.module';



@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserObjectsModule,
    UserObjectsAddModule,
    UserObjectsModifyModule,
    AccountDeleteModule,
    AccountModifyModule,
    HeaderModule
  ],
  exports: [UserComponent]
})
export class UserModule { }
