import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BaseApp';
  component: string = '';

  constructor(private router: Router) {}

  public goToPage(component: string) {
    this.component = component;
    console.log(this.component);
    this.router.navigateByUrl(`/${component}`);
}
}
