import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserObjectsAddComponent } from './user.objects.add.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [UserObjectsAddComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [UserObjectsAddComponent]
})
export class UserObjectsAddModule { }
