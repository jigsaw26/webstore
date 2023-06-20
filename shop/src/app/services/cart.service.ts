import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductService } from './product.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class CartService {
  items: { product: Product, quantity: number }[] = [];
  totalQuantity: number = 0;

  constructor(private http: HttpClient, private productService: ProductService) { }

  addToCart(product: Product) {
    const index = this.items.findIndex(item => item.product._id === product._id);
    if (index >= 0) {
      this.items[index].quantity++;
    } else {
      this.items.push({ product: product, quantity: 1 });
    }
  }

  removeFromCart(item: { product: Product, quantity: number }) {
    const index = this.items.indexOf(item);
    if (index >= 0) {
      this.items.splice(index, 1);
    }
  }

  getItems(): { product: Product, quantity: number }[] {
    return this.items;
  }

  getTotal(): number {
    return this.items.reduce((total, item: any) => total + item.product.price * item.quantity, 0);
  }
  
  getTotalForItem(item: { product: Product, quantity: number }): number {
    let resultPrice = parseInt(item.product.price) * item.quantity;
    return resultPrice;
  }
  

  
  getTotalQuantity(): number {
    this.totalQuantity = 0; 
    for (const item of this.items) {
      this.totalQuantity += item.quantity;
    }
    return this.totalQuantity;
  }

  clearCart() {
    this.items = [];
  }
}
