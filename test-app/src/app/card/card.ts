import { Component,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
})
export class Card {
  @Input() title:string = 'Card Title';
  @Input() desc:string = 'Card description'

  likesCount: number = 0;

  incrementLikes(){
    this.likesCount++;
  }
  //EventEmitter
  @Output() CardDelete = new EventEmitter<void>();

  onDeleteClick(){
    this.CardDelete.emit();
  }
}
