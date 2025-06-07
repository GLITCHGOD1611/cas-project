import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-attendance-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './attendance-management.component.html',
  styleUrls: ['./attendance-management.component.css'],
})
export class AttendanceManagementComponent implements OnInit {
  newAttendance = {
    student_id: null,
    subject_id: null,
    date: '',
    status: 'Present'
  };

  attendance = {
    subject_id: null,
    date: ''
  };

  editAttendanceData = {
    attendance_id: null,
    status: ''
  };

  students: any[] = [];
  subjects: any[] = [];
  attendanceData: any[] = [];
  isEditing = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchSubjects();
    this.fetchStudents();
  }

  // Fetch students from backend
  fetchStudents() {
    this.http.get('http://localhost:5000/api/students').subscribe((response: any) => {
      if (response && Array.isArray(response.data)) {
        this.students = response.data;
      } else {
        console.error('Error: Students data is not an array', response);
        this.students = [];
      }
    });
  }

  // Fetch subjects from backend
  fetchSubjects() {
    this.http.get('http://localhost:5000/api/subjects/subjects').subscribe((response: any) => {
      if (response && Array.isArray(response.data)) {
        this.subjects = response.data;
      } else {
        console.error('Error: Subjects data is not an array', response);
        this.subjects = [];
      }
    });
  }

  // Add Attendance
  addAttendance() {
    this.http.post('http://localhost:5000/api/attendance', this.newAttendance).subscribe(() => {
      alert('Attendance added successfully!');
      this.viewAttendance();
    });
  }

  // View Attendance
  viewAttendance() {
    this.http.post('http://localhost:5000/api/attendance/view', this.attendance).subscribe((data: any) => {
      this.attendanceData = data;
    });
  }

  // Edit Attendance
  editAttendance(record: any) {
    this.isEditing = true;
    this.editAttendanceData = { ...record };
  }

  // Update Attendance
  updateAttendance() {
    this.http.put(`http://localhost:5000/api/attendance/${this.editAttendanceData.attendance_id}`, this.editAttendanceData).subscribe(() => {
      alert('Attendance updated successfully!');
      this.isEditing = false;
      this.viewAttendance();
    });
  }

  // Delete Attendance
  deleteAttendance(attendanceId: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.http.delete(`http://localhost:5000/api/attendance/${attendanceId}`).subscribe(() => {
        alert('Attendance deleted successfully!');
        this.viewAttendance();
      });
    }
  }

  // Cancel edit
  cancelEdit() {
    this.isEditing = false;
  }
}
