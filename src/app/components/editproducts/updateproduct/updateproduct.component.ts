import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Subject } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
})
export class UpdateProductComponent implements OnInit {

  @ViewChild('alert', { static: true }) alert: ElementRef;
  product: Product;
  action: Subject<any> = new Subject();
  showError: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  updateProduct() {
    this.productService.updateProduct(this.product).then((updatedProduct: Product) => {
      this.action.next(updatedProduct);
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
