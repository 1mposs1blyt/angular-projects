import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Смартфон X', price: 29990, oldPrice: 34990, description: 'Мощный смартфон с отличной камерой', image: 'https://via.placeholder.com/150', category: 'Электроника', inStock: true, discount: true },
    { id: 2, name: 'Беспроводные наушники', price: 5990, description: 'Звук высокого качества с шумоподавлением', image: 'https://via.placeholder.com/150', category: 'Электроника', inStock: true, discount: false },
    { id: 3, name: 'Рюкзак городской', price: 3490, oldPrice: 4500, description: 'Удобный водонепроницаемый рюкзак', image: 'https://via.placeholder.com/150', category: 'Аксессуары', inStock: false, discount: true },
    { id: 4, name: 'Механическая клавиатура', price: 7990, description: 'RGB подсветка, синие переключатели', image: 'https://via.placeholder.com/150', category: 'Электроника', inStock: true, discount: false },
    { id: 5, name: 'Настольная лампа', price: 2490, description: 'Светодиодная лампа с регулировкой света', image: 'https://via.placeholder.com/150', category: 'Для дома', inStock: true, discount: false },
    { id: 6, name: 'Умная кружка', price: 4990, oldPrice: 5990, description: 'Поддерживает температуру напитка', image: 'https://via.placeholder.com/150', category: 'Для дома', inStock: false, discount: true }
  ];

  private cartSignal = signal<Product[]>(this.loadCartFromStorage())

  getProducts(): Product[] {
    return this.products;
  }

  getCart() {
    return this.cartSignal;
  }

  addToCart(product: Product) {
    this.cartSignal.update(cart => {
      const updated = [...cart, product];
      this.saveCartToStorage(updated);
      return updated;
    })
  }

  removeFromCart(productId: number) {
    this.cartSignal.update(cart => {
      const updated = cart.filter(p => p.id !== productId);
      this.saveCartToStorage(updated);
      return updated;
    })
  }
  private saveCartToStorage(cart: Product[]) {
    localStorage.setItem('mini_shop_cart', JSON.stringify(cart))
  }
  private loadCartFromStorage(): Product[] {
    const saved = localStorage.getItem('mini_shop_cart');
    return saved ? JSON.parse(saved) : [];
  }
}
