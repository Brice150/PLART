import { Component, Input } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent {
  imagePath: string = environment.imagePath;
  @Input() images!: string[];
  @Input() texts!: string[];

  config: SwiperOptions = {
    mousewheel: {},
    keyboard: {},
    grabCursor: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    speed: 1500,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    spaceBetween: 30,
  };
}
