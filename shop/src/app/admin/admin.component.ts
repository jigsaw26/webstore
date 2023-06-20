import { Component } from '@angular/core';
import { Product } from '../models/product';
import { ObjectId } from 'mongodb';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent {
  product!: Product;
  constructor (private http: HttpClient,private productService: ProductService) {}

  /*checkImage() {
    const img = new Image();
    img.onload = () => {
      
      if (img.naturalWidth > 0) {
        const imgPrew = document.getElementById('image-preview');
        if (imgPrew) {
          imgPrew.innerHTML = '<img src="' + img.src + '" />';
        }
      }
    };
    img.src = this.product.urlImage;
  }*/

  ngOnInit() {
    this.generateId().subscribe((objectId: ObjectId) => {
      this.product = {
        _id: objectId,
        name: '',
        description: '',
        urlImage: '',
        price: ''
      };
    });
  }
  
  generateId(): Observable<ObjectId> {
    const url = `http://localhost:9120/generate_id`;
    return this.http.get<ObjectId>(url);
  }

  

  addProduct() {
    console.log(this.product);
    this.productService.addProduct(this.product).subscribe(() => {
    console.log('Product added successfully!');
    }, error => {
    console.error(error);
    });
    }
}
