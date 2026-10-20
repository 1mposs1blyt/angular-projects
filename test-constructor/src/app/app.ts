import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Hero, HeroCard } from './components/hero-card/hero-card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule, HeroCard],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('test-constructor');
  currentHero: Hero = {
    name: '',
    heroClass: '',
    level: 1,
    power: 'Fireball',
    isAvailable: true
  }

  availablePower = ['Fireball', 'Invisiblility', 'Thunder', 'Healing', 'Ice storm']
  heroes: Hero[] = [
    {
      name: "Fire wizzard",
      heroClass: "wizzard",
      level: 10,
      power: 'Fireball',
      isAvailable: true
    }
  ]

  addHero() {
    // добавление копии оъекта 
    this.heroes.push({ ...this.currentHero })
    this.currentHero = {
      name: '',
      heroClass: '',
      level: 1,
      power: 'Fireball',
      isAvailable: true
    };
  }

  removeHero(index:number){
    this.heroes.splice(index,1);
  }
}
