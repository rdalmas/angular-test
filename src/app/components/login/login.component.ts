import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent {
  error = '';
  loginForm!: FormGroup;
  submitted!: boolean;
  loading = false;

  constructor(private fb: FormBuilder, private authService : AuthService, private router: Router, private messageService: MessageService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.loading = true;

    if (this.loginForm.valid) {
      const username = this.f['username'].value;
      const password = this.f['password'].value;

      if (this.authService.login(username, password)) {
        this.messageService.add({ severity: 'success', detail: 'Login Successfull!' });
        this.router.navigate(['/welcome']);
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Login Failed! Please check your credentials.' });
      }
    }
    this.loading = false;
  }
}