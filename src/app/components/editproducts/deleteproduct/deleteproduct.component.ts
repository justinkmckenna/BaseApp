import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Subject } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-deleteproduct',
  templateUrl: './deleteproduct.component.html',
})
export class DeleteProductComponent implements OnInit {

  product: Product;
  action: Subject<any> = new Subject();

  constructor(private productService: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  deleteProduct() {
    this.productService.deleteProduct(this.product._id).then((response: any) => {
      this.action.next(response.id);
    }).catch((err) => {
      this.toastr.error("Error: Unable To Delete Product.")
    });
  }

  close() {
    this.action.next("close");
  }

}
