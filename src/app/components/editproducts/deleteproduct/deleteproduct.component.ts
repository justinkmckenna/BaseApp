import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Subject } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-deleteproduct',
  templateUrl: './deleteproduct.component.html',
})
export class DeleteProductComponent implements OnInit {

  @ViewChild('alert', { static: true }) alert: ElementRef;
  product: Product;
  action: Subject<any> = new Subject();
  showError: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  deleteProduct() {
    this.productService.deleteProduct(this.product._id).then((response: any) => {
      this.action.next(response.id);
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
