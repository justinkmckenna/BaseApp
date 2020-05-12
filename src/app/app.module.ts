import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './components/products/products.component';
import { PageNotFoundComponent } from './components/pagenotfound/pagenotfound.component';
import { EditProductsComponent } from './components/editproducts/editproducts.component';
import { AddProductComponent } from './components/addproduct/addproduct.component';
import { UpdateProductComponent } from './components/updateproduct/updateproduct.component';
import { DeleteProductComponent } from './components/deleteproduct/deleteproduct.component';
import { ProductService } from './services/product.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    PageNotFoundComponent,
    EditProductsComponent,
    AddProductComponent,
    UpdateProductComponent,
    DeleteProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
  ],
  providers: [ProductService],
  entryComponents: [
    AddProductComponent, 
    UpdateProductComponent, 
    DeleteProductComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
