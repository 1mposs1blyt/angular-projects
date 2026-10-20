import { Component, Signal, signal } from '@angular/core';
import { Header } from './header/header';
import { Card } from './card/card';
import { Footer } from './footer/footer';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface ICard {
  id: number,
  title: string,
  desc: string
}
@Component({
  selector: 'app-root',
  imports: [Header, Card, Footer, FormsModule, CommonModule],
  templateUrl: './app.html',
})
export class App {
  title: any = signal('test-app');

  userName: string = "";



  isActive: boolean = false;
  isWarning: boolean = true;
  boxColor: string = 'orange'

  cards: ICard[] = [
    { id: 1, title: 'Angular', desc: "framework" },
    { id: 2, title: 'TypeScript', desc: "JavaScript with types" },
    { id: 3, title: 'Component', desc: "block" }
  ]
  removeCard(id: number) {
    this.cards = this.cards.filter(card => card.id !== id);
  }
  setIsActive(isActive: boolean) {
    this.isActive = !isActive
  }
}
