import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CartComponent } from './cart/cart.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { AdminComponent } from './admin/admin.component';



const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'cart', component: CartComponent },
  { path: 'products/:id', component: ProductPageComponent },
  { path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
