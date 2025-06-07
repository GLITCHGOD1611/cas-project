import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AdminLoginComponent } from '../../components/admin/admin-login/admin-login.component';
import { HodLoginComponent } from '../../components/hod/hod-login/hod-login.component';
import { StudentLoginComponent } from '../../components/student/student-login/student-login.component';
import { TeacherLoginComponent } from '../../components/teacher/teacher-login/teacher-login.component';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [CommonModule, FormsModule,AdminLoginComponent,TeacherLoginComponent,StudentLoginComponent,HodLoginComponent], // Add FormsModule here
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent {
  loginOptions = [
    { label: 'Admin', selector: 'admin' },
    { label: 'HOD', selector: 'hod' },
    { label: 'Teacher', selector: 'teacher' },
    { label: 'Student', selector: 'student' },
  ];

  // Track the active login view
  activeLogin: string = 'admin';

  // Method to switch active login view
  setActiveLogin(selector: string) {
    this.activeLogin = selector;
  }
}







