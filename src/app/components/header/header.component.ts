import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router : Router) {}

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