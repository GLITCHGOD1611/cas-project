import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../shared/navbar/navbar.component'; // Correct import path based on your structure
import { RoleService } from '../../role-service.service';


@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'], // Fixed typo `styleUrl` to `styleUrls`
})
export class AdminLoginComponent implements AfterViewInit {
  email = '';
  password = '';
  errorMessage = '';

  @ViewChild(NavbarComponent) navbarComponent!: NavbarComponent;

  constructor(private http: HttpClient, private router: Router,private roleService: RoleService,) {}

  ngAfterViewInit() {
    console.log('NavbarComponent initialized:', this.navbarComponent);
  }

  login() {
    this.http.post('http://localhost:5000/api/admin/login', {
      email: this.email,
      password: this.password,
    }).subscribe({
      next: (response: any) => {
        if (response.success) {
          // Set the role to 'admin' using RoleService
          this.roleService.setRole('admin'); // Use RoleService to manage roles
  
          // Navigate to admin dashboard
          this.router.navigate(['/home/admin/dashboard']);
        }
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Invalid login credentials.';
      },
    });
  }
  
}
