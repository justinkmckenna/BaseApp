import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Subject } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
})
export class UpdateProductComponent implements OnInit {

  product: Product;
  action: Subject<any> = new Subject();

  constructor(private productService: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  updateProduct() {
    this.productService.updateProduct(this.product).then((updatedProduct: Product) => {
      this.action.next(updatedProduct);
    }).catch((err) => {
      this.toastr.error("Error: Unable To Update Product.");
    });
  }

  close() {
    this.action.next("close");
  }

}
