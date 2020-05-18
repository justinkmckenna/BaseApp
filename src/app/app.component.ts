import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'BaseApp';
  component: string = "";

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.component = window.location.pathname.split('/')[1];
  }

  public goToPage(component: string) {
    this.component = component;
    this.router.navigateByUrl(`/${component}`);
}
}
