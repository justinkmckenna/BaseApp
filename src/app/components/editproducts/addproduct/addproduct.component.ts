import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Subject } from 'rxjs';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
})
export class AddProductComponent {

  product: Product = new Product();
  action: Subject<any> = new Subject();

  public uploader: FileUploader;

  constructor(private productService: ProductService, private toastr: ToastrService) {
    this.uploader = new FileUploader({
      url: window.location.origin + '/api/products/pictures',
    });

    this.uploader.response.subscribe(res => console.log(res));
  }

  addProduct() {
    this.uploader.uploadAll();
    // this.productService.createProduct(this.product).then((newProduct: Product) => {
    //   this.action.next(newProduct);
    // }).catch((err) => {
    //   console.log(err);
    //   this.toastr.error("Error: Unable To Add Product.")
    // });
  }

  close() {
    this.action.next("close");
  }

}
