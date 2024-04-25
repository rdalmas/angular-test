import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-guards';
  isUserLoggedIn: boolean = false;
  
  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url === '/' || val.url === '/login') {
          this.isUserLoggedIn = false;
        } else {
          this.isUserLoggedIn = true;
        }
      }
    })
  }
}