import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountDeleteComponent } from './account.delete.component';



@NgModule({
  declarations: [AccountDeleteComponent],
  imports: [
    CommonModule
  ],
  exports : [AccountDeleteComponent]
})
export class AccountDeleteModule { }
