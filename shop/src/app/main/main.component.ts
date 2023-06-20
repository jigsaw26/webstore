import { Component } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { CurrencyService } from '../services/currency.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  products: Product[] = [];
  searchText: string = '';
  

  constructor(private productService: ProductService, private cartService: CartService, private currencyService: CurrencyService) {}
  selectedCurrency: string = this.currencyService.getSelectedCurrency();

  ngOnInit()
  {
    this.selectedCurrency = this.currencyService.getSelectedCurrency();
  }
  
  onSearchChange(event: any) {
    this.searchText = event.target.value;
  }

  getTotalQuantity(): number {
    return this.cartService.getTotalQuantity();
  }

  updatePricesEUR() {
    this.selectedCurrency = 'EUR';
    this.currencyService.setSelectedCurrency(this.selectedCurrency);
  }
  updatePricesUSD() {
    this.selectedCurrency = 'USD';
    this.currencyService.setSelectedCurrency(this.selectedCurrency);
  }
  updatePricesUAH() {
    this.selectedCurrency = 'UAH';
    this.currencyService.setSelectedCurrency(this.selectedCurrency);
  }
}
