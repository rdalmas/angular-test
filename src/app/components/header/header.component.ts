import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  sidebarVisible = false;
  menuItems: MenuItem[] = [];
  constructor(private authService: AuthService, private router : Router) {}

  ngOnInit() {
    this.menuItems = [
      {
        label: 'General',
        items: [
          {
            label: "Welcome",
            icon: "pi pi-home",
            url: "/welcome"
          },
        ]
      },
      {
        label: 'Sales',
        items: [
          {
            label: "Add Product",
            icon: "pi pi-plus-circle",
            url: "/new-product"
          },
          {
            label: "Sales Report",
            icon: "pi pi-print",
            url: "/sales"
          }
        ]
      }
    ]
  }


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  home(): void {
    if (this.authService.isAuthenticatedUser()) {
      this.router.navigate(['/welcome']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
