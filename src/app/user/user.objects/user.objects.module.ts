import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserObjectsComponent } from './user.objects.component';



@NgModule({
  declarations: [UserObjectsComponent],
  imports: [
    CommonModule
  ],
  exports: [UserObjectsComponent]
})
export class UserObjectsModule { }
