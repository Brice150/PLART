import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminObjectsComponent } from './admin.objects.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [AdminObjectsComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports : [AdminObjectsComponent]
})
export class AdminObjectsModule { }
