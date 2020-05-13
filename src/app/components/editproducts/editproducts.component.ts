import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { AddProductComponent } from './addproduct/addproduct.component';
import { UpdateProductComponent } from './updateproduct/updateproduct.component';
import { DeleteProductComponent } from './deleteproduct/deleteproduct.component';

@Component({
  selector: 'app-editproducts',
  templateUrl: './editproducts.component.html',
})
export class EditProductsComponent implements OnInit {
  
  products: Product[];
  modalRef: MDBModalRef;

  constructor(private productService: ProductService, private modalService: MDBModalService) { }

  ngOnInit(): void {
    this.productService.getProducts().then((products: Product[]) => {
      this.products = products;
    });
  }

  addModal() {
    this.modalRef = this.modalService.show(AddProductComponent);
    this.modalRef.content.action.subscribe((newProduct) => { 
      if (newProduct != "close") {
        this.addProduct(newProduct);
      }
      this.modalRef.hide();
    });
  }

  updateModal(product: Product) {
    this.modalRef = this.modalService.show(UpdateProductComponent, { data: { product }});
    this.modalRef.content.action.subscribe((updatedProduct) => { 
      if (updatedProduct != "close") {
        this.updateProduct(updatedProduct);
      }
      this.modalRef.hide() 
    });
  }

  deleteModal(product: Product) {
    this.modalRef = this.modalService.show(DeleteProductComponent, { data: { product }});
    this.modalRef.content.action.subscribe((id) => { 
      if (id != "close") {
        this.deleteProduct(id);
      }
      this.modalRef.hide() 
    });
  }

  addProduct(product: Product) {
    this.products.push(product);
    return this.products;
  }

  updateProduct(product: Product) {
    var idx = this.getIndexOfProduct(product._id);
    if (idx !== -1) {
      this.products[idx] = product;
    }
    return this.products;
  }

  deleteProduct(id: String) {
    var i = this.getIndexOfProduct(id);
    if (i !== -1) {
      this.products.splice(i, 1);
    }
    return this.products;
  }

  private getIndexOfProduct(id: String) {
    return this.products.findIndex((product) => {
      return product._id === id;
    });
  }

}
