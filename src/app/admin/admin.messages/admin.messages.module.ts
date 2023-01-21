import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMessagesComponent } from './admin.messages.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [AdminMessagesComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports : [AdminMessagesComponent]
})
export class AdminMessagesModule { }
