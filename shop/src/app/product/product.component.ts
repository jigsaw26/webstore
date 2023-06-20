import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { CurrencyService } from '../services/currency.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnChanges {
  @Input() searchText!: string;
  @Input() selectedCurrency!: string;
  products: Product[] = [];

  constructor(private http: HttpClient, private productService: ProductService, private cartService: CartService, 
    private router: Router, private currencyService: CurrencyService) {}

  goToProductPage(product: Product): void {
    this.router.navigate(['/products', product._id]);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(
      products => {
        this.products = this.currencyService.convertPrices(products, this.selectedCurrency);
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchText'] || changes['selectedCurrency']) {
      this.productService.getProducts().subscribe(
        products => {
          if (this.searchText) {
            this.products = this.currencyService.convertPrices(products, this.selectedCurrency).filter(product =>
              product.name.toLowerCase().includes(this.searchText.toLowerCase()));
          }
          else if(this.selectedCurrency)
          {
            this.products = this.currencyService.convertPrices(products, this.selectedCurrency);
          }
          else {
            this.products = products;
          }
        }
      );
    }
  }
}
    