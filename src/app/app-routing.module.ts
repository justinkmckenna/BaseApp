import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { PageNotFoundComponent } from './components/pagenotfound/pagenotfound.component';
import { EditProductsComponent } from './components/editproducts/editproducts.component';


const routes: Routes = [
  { path:  'products', component: ProductsComponent },
  { path:  'edit', component: EditProductsComponent },
  { path:  'home', component: HomeComponent },
  { path:  '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload'
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
