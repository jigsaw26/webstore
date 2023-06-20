import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private selectedCurrency: string = "USD";

  constructor() { }

  public setSelectedCurrency(currency: string): void {
    this.selectedCurrency = currency;
  }

  public getSelectedCurrency(): string {
    return this.selectedCurrency;
  }

  public convertPrices(products: Product[], currency: string): Product[] {
    const conversionRate = this.getConversionRate(currency);
    return products.map(product => {
      const convertedProduct = Object.assign({}, product);
      const price: number = parseInt(product.price);
      convertedProduct.price = (price * conversionRate).toFixed(2).toString();
      return convertedProduct;
    });
  }

  getConversionRate(currency: string): number {
    switch (currency) {
      case 'EUR':
        return 0.91;
      case 'UAH':
        return 36.70;
      default:
        return 1; 
    }
  }
}
