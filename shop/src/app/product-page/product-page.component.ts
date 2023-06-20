import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { CurrencyService } from '../services/currency.service';
import { Comment } from '../models/comment';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  product!: Product;
  comments!: Comment[];
  productId: string = "";
  constructor(private productService: ProductService, private route: ActivatedRoute, 
    private currencyService: CurrencyService, private http: HttpClient, private cartService: CartService) {}
  selectedCurrency: string = this.currencyService.getSelectedCurrency();

  ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');
  this.productId = id ?? 'defaultId';
  this.productService.getProduct(this.productId).subscribe(product => {
    this.product = product;
    this.selectedCurrency = this.currencyService.getSelectedCurrency();
    if (this.selectedCurrency) {
      this.product = this.currencyService.convertPrices([this.product], this.selectedCurrency)[0];
    }
    this.getComments(); // переместите вызов этой функции сюда
  });
}

  getComments(): void {
    this.productService.getComments()
      .subscribe(comments => {
        const filteredComments = comments.filter(comment => comment.productId === this.product._id);
        this.comments = filteredComments;
      });
  }

  addToComments()
  {
    const name = (document.getElementById('commentName') as HTMLInputElement).value;
    const text = (document.getElementById('commentText') as HTMLInputElement).value;
    
    if(name === "")
    {
      alert("Enter name");
      return;
    }
    if(text === "")
    {
      alert("Enter comment");
    }

    const productId = this.product._id;
  
    let comment = new Comment(name, text, productId);

    const bannedWords = ['кокос', 'банан', 'плохой'];
    comment.text = comment.text.replace(new RegExp(bannedWords.join('|'), 'gi'), replaceBannedWords)
    .replace(/@/gi, '*');

    function replaceBannedWords(match: string): string {
      const stars = '*'.repeat(match.length);
      return stars;
    }

    this.http.post<Comment>("http://localhost:9120/comments", comment).subscribe((response) => {
      console.log('Comment added:', response);

  })
  
  this.productService.getProduct(this.productId).subscribe(product => {
    this.product = product;
    this.selectedCurrency = this.currencyService.getSelectedCurrency();
    if (this.selectedCurrency) {
      this.product = this.currencyService.convertPrices([this.product], this.selectedCurrency)[0];
    }
    this.getComments(); // переместите вызов этой функции сюда
  });
}
  addToCart(product: Product) {
  this.cartService.addToCart(product);
}

getTotalQuantity(): number {
  return this.cartService.getTotalQuantity();
}
}
