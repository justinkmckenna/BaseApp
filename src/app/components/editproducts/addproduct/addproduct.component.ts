import { Component, ViewChild, ElementRef } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Subject } from 'rxjs';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
})
export class AddProductComponent {

  @ViewChild('uploadEl') uploadElRef: ElementRef

  product: Product = new Product()
  action: Subject<any> = new Subject()
  picturePaths: string[] = []
  uploaderSuccess = true

  public uploader: FileUploader;

  constructor(private productService: ProductService, private toastr: ToastrService) {
    this.uploader = new FileUploader({
      url: window.location.origin + '/api/products/picture',
    });
    this.uploader.onCompleteAll = () => { 
      if (this.uploaderSuccess) {
        console.log("success")
        this.addProduct()
      }
      else {
        console.log("failure")
        if (this.picturePaths.length > 0) {
          this.deleteUploadedPictures()
        }
      }
      this.resetUploader()
      console.log(this.picturePaths) 
    }
    this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => { 
      this.picturePaths.push(response) 
    }
    this.uploader.onErrorItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      this.toastr.error(`Unable To Upload Picture: ${item.file.name}`, "Error")
      this.uploaderSuccess = false
    }
  }

  addAll() {
    this.uploader.uploadAll()
  }

  addProduct() {
    this.productService.createProduct(this.product).then((newProduct: Product) => {
      this.action.next(newProduct);
    }).catch((err) => {
      console.log(err);
      this.deleteUploadedPictures()
      this.toastr.error("Error: Unable To Add Product.")
    });
  }

  deleteUploadedPictures() {
    this.productService.deletePictures(this.picturePaths)
    this.picturePaths = []
  }

  resetUploader() {
    this.uploadElRef.nativeElement.value = ''
    this.uploader._nextIndex = 0
    this.uploaderSuccess = true
  }

  close() {
    this.action.next("close");
  }

}
