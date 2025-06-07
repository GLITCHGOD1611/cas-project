import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
declare const bootstrap: any;

@Component({
  selector: 'app-manage-teachers',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-teachers.component.html',
  styleUrls: ['./manage-teachers.component.css'],
})
export class ManageTeachersComponent {
  teachers: any[] = [];
  courses: any[] = [];
  newTeacher = {
    name: '',
    email: '',
    password: '',
    course_id: null,
    qualification: '',
    experience_years: 0,
  };

  selectedTeacher: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTeachers();
    this.getCourses();
  }

  // Fetch teachers from the backend
  getTeachers() {
    this.http.get('http://localhost:5000/api/teacher/teachers').subscribe(
      (response: any) => {
        console.log('Teachers fetched:', response?.data);
        this.teachers = response?.data || [];
      },
      (error) => console.error('Error fetching teachers:', error)
    );
  }

  // Fetch courses from the backend
  getCourses() {
    this.http.get('http://localhost:5000/api/course/list').subscribe(
      (response: any) => {
        console.log('Courses fetched:', response?.data);
        this.courses = response?.data || [];
      },
      (error) => console.error('Error fetching courses:', error)
    );
  }

  // Add a new teacher
  addTeacher() {
    this.http.post('http://localhost:5000/api/teacher/teachers/add', this.newTeacher).subscribe(
      () => {
        alert('Teacher added successfully!');
        this.newTeacher = { name: '', email: '', password: '', course_id: null, qualification: '', experience_years: 0 };
        this.getTeachers();
      },
      (error) => console.error('Error adding teacher:', error)
    );
  }

  openEditModal(teacher: any) {
    if (!teacher) {
      console.error('No teacher data provided to openEditModal.');
      return;
    }
  
    // Copy the teacher data into the selectedTeacher object
    this.selectedTeacher = { ...teacher };
  
    // Open the modal using Bootstrap
    const modalElement = document.getElementById('editTeacherModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error('Modal element with ID "editTeacherModal" not found.');
    }
  }
  
  saveTeacherChanges() {
    if (!this.selectedTeacher || !this.selectedTeacher.teacher_id) {
      alert('Invalid teacher data. Cannot update.');
      console.error('Invalid teacher data:', this.selectedTeacher);
      return;
    }
  
    console.log('Updating teacher with data:', this.selectedTeacher);
  
    // Ensure password is only included if it's not empty
    const teacherData = { ...this.selectedTeacher };
    if (!teacherData.password) {
      delete teacherData.password; // Remove the password field if it's empty
    }
  
    // HTTP PUT request to update the teacher
    this.http
      .put(
        `http://localhost:5000/api/teacher/teachers/update/${this.selectedTeacher.teacher_id}`,
        teacherData
      )
      .subscribe({
        next: (response) => {
          console.log('Teacher updated successfully:', response);
          alert('Teacher updated successfully!');
          this.getTeachers(); // Refresh the teacher list
  
          // Close the modal after a successful update
          const modalElement = document.getElementById('editTeacherModal');
          if (modalElement) {
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            if (modalInstance) {
              modalInstance.hide();
            }
          }
        },
        error: (error) => {
          console.error('Error updating teacher:', error);
  
          // Handle error responses
          if (error.status === 500) {
            alert('Server error: Unable to update teacher. Please try again later.');
          } else if (error.status === 400) {
            alert('Invalid data provided. Please check the fields and try again.');
          } else if (error.status === 404) {
            alert('Teacher not found. It may have been deleted.');
          } else {
            alert('An unexpected error occurred. Please check the console for details.');
          }
        },
      });
  }
  

  // Delete a teacher
  deleteTeacher(teacherId: number) {
    if (confirm('Are you sure you want to delete this teacher?')) {
      this.http.delete(`http://localhost:5000/api/teacher/teachers/delete/${teacherId}`).subscribe(
        () => {
          alert('Teacher deleted successfully!');
          this.getTeachers();
        },
        (error) => console.error('Error deleting teacher:', error)
      );
    }
  }
}
