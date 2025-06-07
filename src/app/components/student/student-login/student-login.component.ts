import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { RoleService } from '../../role-service.service';

@Component({
  selector: 'app-student-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css'],
})
export class StudentLoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  @ViewChild(NavbarComponent) navbarComponent!: NavbarComponent;

  constructor(
    private http: HttpClient,
    private router: Router,
    private roleService: RoleService
  ) {}

  ngAfterViewInit() {
    console.log('NavbarComponent initialized:', this.navbarComponent);
  }

  login() {
    this.http.post('http://localhost:5000/api/student/login', {
      email: this.email,
      password: this.password,
    }).subscribe({
      next: (response: any) => {
        console.log('Login Response:', response); // Check the structure of the response
  
        if (response.success) {
          // Access student_id from response.data
          const studentId = response.data.student_id;
  
          if (studentId) {
            // Store the student ID in localStorage
            localStorage.setItem('studentId', studentId.toString());
  
            // Set the role to 'student' using RoleService
            this.roleService.setRole('student'); // Use RoleService to manage roles
  
            // Navigate to the student dashboard
            this.router.navigate(['/home/sidebar']);
          } else {
            this.errorMessage = 'Student ID not found in the response';
          }
        } else {
          this.errorMessage = response.message || 'Login failed';
        }
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Invalid login credentials.';
      },
    });
  }
  

}
