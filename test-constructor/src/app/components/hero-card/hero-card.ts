import { Input, Output, Component, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Hero {
  name: string
  heroClass: string
  level: number
  power: string
  isAvailable: boolean
}


@Component({
  selector: 'app-hero-card',
  imports: [CommonModule],
  templateUrl: './hero-card.html'
})

export class HeroCard {
[x: string]: any;
  @Input() hero: Hero = {
    name: '',
    heroClass: '',
    level: 0,
    power: '',
    isAvailable: true
  }

  @Output() onDelete = new EventEmitter();

  deleteHero() {
    this.onDelete.emit();
  }
}
