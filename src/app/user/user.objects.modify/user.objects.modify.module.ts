import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserObjectsModifyComponent } from './user.objects.modify.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [UserObjectsModifyComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [UserObjectsModifyComponent]
})
export class UserObjectsModifyModule { }
