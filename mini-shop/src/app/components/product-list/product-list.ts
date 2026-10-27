import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product';
import { ProductCardComponent } from '../product-card/product-card';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductListComponent {
  private productService = inject(ProductService);

  searchQuery = signal('');
  allProducts = this.productService.getProducts();
  cart = this.productService.getCart();

  filteredProducts = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.allProducts;
    return this.allProducts.filter(p => p.name.toLowerCase().includes(query));
  })
  isProductInCart(id: number): boolean {
    return this.cart().some(item => item.id === id);
  }

  addToCart(product: Product) {
    this.productService.addToCart(product);
  }
}
