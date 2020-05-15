import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { DetailsComponent } from './details/details.component';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  providers: [ProductService]
})
export class ProductsComponent implements OnInit {

  products: Product[];
  modalRef: MDBModalRef;

  constructor(private productService: ProductService, private modalService: MDBModalService) { }

  ngOnInit(): void {
    this.productService.getProducts().then((products: Product[]) => {
      this.products = products;
    });
  }

  detailsModal(product: Product) {
    this.modalRef = this.modalService.show(DetailsComponent, { data: { product }});
    this.modalRef.content.action.subscribe((action) => { 
      if (action != "close") {
        console.log("addedToCart");
      }
      this.modalRef.hide();
    });
  }

}
