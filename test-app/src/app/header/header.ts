import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
})
export class Header {
  siteTitle:string = 'Angular-App';
  isAuthorized: boolean = false;
  toggleAuth(){
    this.isAuthorized = !this.isAuthorized;
  }
}
