import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './stats.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [StatsComponent],
  imports: [CommonModule, RouterModule],
  exports: [StatsComponent],
})
export class StatsModule {}
