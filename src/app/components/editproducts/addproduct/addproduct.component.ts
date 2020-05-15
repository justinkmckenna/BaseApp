import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Subject } from 'rxjs';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
})
export class AddProductComponent {

  @ViewChild('alert', { static: true }) alert: ElementRef;
  product: Product = new Product();
  action: Subject<any> = new Subject();
  showError: boolean = false;

  public uploader: FileUploader = new FileUploader({
    url: window.location.origin,
    itemAlias: 'image'
  });

  constructor(private productService: ProductService) {
    console.log(window.location.origin);
   }

  addProduct() {
    console.log(this.product);
    this.productService.createProduct(this.product).then((newProduct: Product) => {
      this.action.next(newProduct);
    }).catch((err) => {
      this.showError = true;
    });
  }

  close() {
    this.action.next("close");
  }

  closeAlert() {
    this.showError = false;
  }

}
