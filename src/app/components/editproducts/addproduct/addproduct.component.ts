import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { fileToBase64 } from 'src/app/helpers/fileHelper'

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
})
export class AddProductComponent {

  product: Product = new Product()
  action: Subject<any> = new Subject()

  constructor(private productService: ProductService, private toastr: ToastrService) {}

  async addProduct() {
    try {
      this.product.pictures = await Promise.all(this.product.pictures.map(async picture => {
        return await fileToBase64(picture)
      }))
      console.log(this.product)
      let newProduct = await this.productService.createProduct(this.product)
      this.action.next(newProduct);
    } catch (e) {
      console.log(e)
      this.toastr.error("Unable To Add Product", "Error")
    }
  }

  onChange(event) {
    var files = event.srcElement.files
    for(let file of files) {
      this.product.pictures.push(file)
    }
  }

  removePicture(picture: File) {
    this.product.pictures = this.product.pictures.filter(p => p.name != picture.name )
  }

  close() {
    this.action.next("close");
  }

}
