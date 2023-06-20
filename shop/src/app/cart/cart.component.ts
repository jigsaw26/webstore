import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CurrencyService } from '../services/currency.service';
import { ProductService } from '../services/product.service';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  items: { product: any, quantity: number }[] = [];
  total: number = 0;

  constructor(public cartService: CartService, private currencyService: CurrencyService, private productService: ProductService) { }
  selectedCurrency: string = this.currencyService.getSelectedCurrency();
   
  ngOnInit(): void {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
    this.getTotalInSelectedCurrency();

    };

  getTotalInSelectedCurrency() {
    this.productService.getProducts().subscribe((products) => {
      const productsWithSelectedCurrency = this.currencyService.convertPrices(products, this.selectedCurrency);

      this.items.forEach((item) => {
        const product = productsWithSelectedCurrency.find((p) => p._id === item.product._id);
        if (product) {
          item.product.price = product.price;
        }
      });

      this.total = this.cartService.getTotal();
    });
  }
  incrementQuantity(item: any) {
    item.quantity++;
  }
  
  decrementQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  removeItem(item: { product: any, quantity: number }) {
    this.cartService.removeFromCart(item);
    this.total = this.cartService.getTotal();
  }

  clearCart() {
    this.cartService.clearCart();
    this.items = [];
    this.total = 0;
  }
}
