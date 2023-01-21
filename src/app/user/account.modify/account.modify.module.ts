import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountModifyComponent } from './account.modify.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AccountModifyComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [AccountModifyComponent]
})
export class AccountModifyModule { }
