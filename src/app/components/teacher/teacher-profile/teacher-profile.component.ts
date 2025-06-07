import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class TeacherProfileComponent implements OnInit {

  isEditing = false; // Toggle between View and Edit Mode

  teacherProfile = {
    name: '',
    email: '',
    qualification: '',
    experience_years: '',
    profileImage: '' // Profile Image Placeholder
  };

  teacherId: number | undefined;
  private apiUrl = 'http://localhost:5000/api/teacherprofile/teacher';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const storedTeacherId = localStorage.getItem('teacherId');
    this.teacherId = storedTeacherId ? +storedTeacherId : undefined;

    if (this.teacherId) {
      this.getProfile();
    } else {
      alert('Teacher ID not found. Please log in.');
      this.router.navigate(['/login']);
    }
  }

  // 🔹 Fetch Profile from API
  getProfile(): void {
    this.http.get(`${this.apiUrl}/profile/${this.teacherId}`).subscribe(
      (data: any) => {
        if (data.success) {
          this.teacherProfile = data.data;
        } else {
          alert('Error fetching teacher profile');
        }
      },
      (error) => {
        console.error('Error fetching profile', error);
        alert('Error fetching teacher profile');
      }
    );
  }

  // 🔹 Toggle between View and Edit Mode
  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  // 🔹 Save Updated Profile
  saveProfile(): void {
    this.http.put(`${this.apiUrl}/update/${this.teacherId}`, this.teacherProfile).subscribe(
      (response: any) => {
        if (response.success) {
          alert('Profile updated successfully!');
          this.toggleEdit();
        } else {
          alert('Error updating profile');
        }
      },
      (error) => {
        console.error('Error updating profile', error);
        alert('Failed to update profile');
      }
    );
  }
}
