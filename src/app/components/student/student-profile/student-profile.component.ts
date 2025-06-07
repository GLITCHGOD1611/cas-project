import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class StudentProfileComponent implements OnInit {

  isEditing = false; // Toggle Edit Mode

  studentProfile = {
    name: '',
    email: '',
    enrollment_number: '',
    parent_contact: ''
  };

  studentId: number | undefined;
  private apiUrl = 'http://localhost:5000/api/studentprofile/student';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const storedStudentId = localStorage.getItem('studentId');
    this.studentId = storedStudentId ? +storedStudentId : undefined;

    if (this.studentId) {
      this.getProfile();
    } else {
      alert('Student ID not found. Please log in.');
      this.router.navigate(['/login']);
    }
  }

  // Fetch Student Profile from API
  getProfile(): void {
    this.http.get(`${this.apiUrl}/profile/${this.studentId}`).subscribe(
      (data: any) => {
        if (data.success) {
          this.studentProfile = data.data;
        } else {
          alert('Error fetching student profile');
        }
      },
      (error) => {
        console.error('Error fetching profile', error);
        alert('Error fetching student profile');
      }
    );
  }

  // Toggle Edit Mode
  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  // Save Updated Profile
  saveProfile(): void {
    this.http.put(`${this.apiUrl}/update/${this.studentId}`, this.studentProfile).subscribe(
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
