import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
})
export class AddProductComponent {

  @Input() createHandler: Function;
  product: Product = new Product();
  events: Subject<any> = new Subject();

  constructor(private productService: ProductService) { }

  addProduct() {
    this.productService.createProduct(this.product).then((newProduct: Product) => {
      this.createHandler(newProduct);
    });
    this.close();
  }

  close() {
    this.events.next("close");
  }

}
