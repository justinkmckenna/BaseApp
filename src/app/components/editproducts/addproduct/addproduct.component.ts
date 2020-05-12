import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
})
export class AddProductComponent {

  @Input() createHandler: Function;
  @ViewChild('alert', { static: true }) alert: ElementRef;
  product: Product = new Product();
  action: Subject<any> = new Subject();
  showError: boolean = false;

  constructor(private productService: ProductService) {
   }

  addProduct() {
    this.productService.createProduct(this.product).then((newProduct: Product) => {
      this.createHandler(newProduct);
      this.close();
    }).catch((err) => {
      console.log(err);
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
