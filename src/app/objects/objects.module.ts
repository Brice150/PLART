import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectsComponent } from './objects.component';
import { CardsModule } from './cards/cards.module';
import { HeaderModule } from '../header/header.module';



@NgModule({
  declarations: [ObjectsComponent],
  imports: [
    CommonModule,
    CardsModule,
    HeaderModule
  ],
  exports: [ObjectsComponent]
})
export class ObjectsModule { }
