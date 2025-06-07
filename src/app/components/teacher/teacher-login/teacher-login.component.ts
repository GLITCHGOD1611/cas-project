import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../shared/navbar/navbar.component'; // Correct import path based on your structure
import { RoleService } from '../../role-service.service';

@Component({
  selector: 'app-teacher-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './teacher-login.component.html',
  styleUrls: ['./teacher-login.component.css']
})
export class TeacherLoginComponent {
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
    this.http.post('http://localhost:5000/api/teacher/teachers/login', {
      email: this.email,
      password: this.password,
    }).subscribe({
      next: (response: any) => {
        if (response.success) {
          // Assuming that teacher_id is available inside response.user.teacher_id
          const teacherId = response.user.teacher_id;
          
          // Store the teacher ID in localStorage
          localStorage.setItem('teacherId', teacherId.toString());

          // Set the role to 'teacher' using RoleService
          this.roleService.setRole('teacher'); // Use RoleService to manage roles

          // Navigate to teacher dashboard
          this.router.navigate(['/home/sidebar']);
        }
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Invalid login credentials.';
      },
    });
  }
}
