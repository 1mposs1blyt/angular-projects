import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css']
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;

  @Input() isInCart: boolean = false;
  
  @Output() buy = new EventEmitter<Product>();

  onBuyClick() {
    this.buy.emit(this.product);
  }
}