import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Subject } from 'rxjs';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
})
export class AddProductComponent {

  product: Product = new Product();
  action: Subject<any> = new Subject();

  public uploader: FileUploader;
  hasBaseDropZoneOver:boolean;
  response:string;

  constructor(private productService: ProductService, private toastr: ToastrService) {
    this.uploader = new FileUploader({
      url: window.location.origin + '/api/products/pictures',
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item) => {
        return new Promise( (resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }});
   this.hasBaseDropZoneOver = false;
   this.response = '';
   this.uploader.response.subscribe( res => this.response = res );
  }

  addProduct() {
    this.uploader.uploadAll();
    console.log(this.response);
    this.action.next("ah");
    // this.productService.createProduct(this.product).then((newProduct: Product) => {
    //   this.action.next(newProduct);
    // }).catch((err) => {
    //   console.log(err);
    //   this.toastr.error("Error: Unable To Add Product.")
    // });
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  close() {
    this.action.next("close");
  }

}
