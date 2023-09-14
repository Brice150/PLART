import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SliderModule } from './slider/slider.module';
import { StatsModule } from './stats/stats.module';
import { HeaderModule } from '../header/header.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, SliderModule, StatsModule, HeaderModule],
  exports: [HomeComponent],
})
export class HomeModule {}
