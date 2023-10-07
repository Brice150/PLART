import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages.component';
import { HeaderModule } from '../header/header.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MessagesComponent],
  imports: [
    CommonModule,
    HeaderModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  exports: [MessagesComponent],
})
export class MessagesModule {}
