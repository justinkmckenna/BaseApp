import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'BaseApp';
  component: string = "";

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.component = window.location.pathname.split('/')[1];
    console.log(this.component);
  }

  public goToPage(component: string) {
    this.component = component;
    console.log(this.component);
    this.router.navigateByUrl(`/${component}`);
}
}
