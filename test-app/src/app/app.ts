import { Component, Signal, signal } from '@angular/core';
import { Header } from './header/header';
import { Card } from './card/card';
import { Footer } from './footer/footer';
interface ICard {
  id: number,
  title: string,
  desc: string
}
@Component({
  selector: 'app-root',
  imports: [Header, Card, Footer],
  templateUrl: './app.html',
})
export class App {
  title: any = signal('test-app');
  cards: ICard[] = [
    { id: 1, title: 'Angular', desc: "framework" },
    { id: 2, title: 'TypeScript', desc: "JavaScript with types" },
    { id: 3, title: 'Component', desc: "block" }
  ]
  removeCard(id: number) {
    this.cards = this.cards.filter(card => card.id !== id);
  }
}
