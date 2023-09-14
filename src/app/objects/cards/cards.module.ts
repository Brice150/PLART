import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './cards.component';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CardsComponent],
  imports: [CommonModule, MatChipsModule, FormsModule],
  exports: [CardsComponent],
})
export class CardsModule {}
