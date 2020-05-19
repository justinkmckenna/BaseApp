import { Component, ViewChild, ElementRef } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
})
export class AddProductComponent {

  product: Product = new Product()
  action: Subject<any> = new Subject()
  pictures: File[] = []

  constructor(private productService: ProductService, private toastr: ToastrService) {}

  addAll() {
    let formData = new FormData()
    for (let picture of this.pictures) { 
      formData.append("picture", picture);
    }
    this.productService.addPictures(formData).then((newPictures: File[]) => {
      console.log(newPictures)
    }).catch((err) => {
      console.log(err)
      this.toastr.error("Error: Unable To Upload Pictures.")
    });
  }

  addProduct() {
    this.productService.createProduct(this.product).then((newProduct: Product) => {
      this.action.next(newProduct);
    }).catch((err) => {
      console.log(err);
      this.toastr.error("Error: Unable To Add Product.")
    });
  }

  onChange(event) {
    var files = event.srcElement.files;
    for(let file of files) {
      this.pictures.push(file)
    }
  }

  removePicture(picture: File) {
    this.pictures = this.pictures.filter(p => p.name != picture.name )
  }

  close() {
    this.action.next("close");
  }

}
