import { Component, Input } from '@angular/core';
import { carouselItem } from 'src/app/models/CarouselItem.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  @Input() carouselItems!: carouselItem[];
  @Input() speed: number = 10;

  trackStyle = {};

  ngOnInit() {
    this.startScrolling();
  }

  selectedIndex = 0;

  selectItem(i: number) {
    this.selectedIndex = i;
  }

  startScrolling() {
    const totalWidth = this.carouselItems.length * 200;
    const animationDuration = totalWidth / this.speed;

    this.trackStyle = {
      animation: 'scroll ${animationDuration}s linear infinite',
    };
  }
}
