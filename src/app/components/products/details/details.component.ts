import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit {

  @ViewChild('alert', { static: true }) alert: ElementRef;
  product: Product = new Product();
  action: Subject<any> = new Subject();
  showError: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  addToCart() {
    console.log("addedToCart");
    this.action.next("addedToCart");
  }

  close() {
    this.action.next("close");
  }

  closeAlert() {
    this.showError = false;
  }

}
