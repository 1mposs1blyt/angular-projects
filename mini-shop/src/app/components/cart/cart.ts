import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent {
  private productService = inject(ProductService);
  cart = this.productService.getCart();

  removeItem(id: number) {
    this.productService.removeFromCart(id);
  }

  totalPrice(): number {
    return this.cart().reduce((sum, item) => sum + item.price, 0);
  }
}