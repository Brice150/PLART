import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';



@NgModule({
  declarations: [SliderComponent],
  imports: [
    CommonModule,
    NgxUsefulSwiperModule
  ],
  exports : [SliderComponent]
})
export class SliderModule { }
