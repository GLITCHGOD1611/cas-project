import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-management',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './student-management.component.html',
  styleUrl: './student-management.component.css',
})
export class StudentManagementComponent {
  students: any[] = [];
  courses: any[] = [];
  filteredStudents: any[] = [];
  semesters: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

  newStudent = {
    name: '',
    email: '',
    password: '',
    enrollment_number: '',
    course_id: null,
    semester: null,
    parent_contact: '',
  };
  
  selectedStudent: any = {};
  selectedCourseId: number | null = null;
  showModal: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getStudents();
    this.getCourses();
  }

  getStudents() {
    this.http.get('http://localhost:5000/api/students').subscribe(
      (response: any) => (this.students = response?.data || []),
      (error) => console.error('Error fetching students:', error)
    );
  }

  getCourses() {
    this.http.get('http://localhost:5000/api/course/list').subscribe(
      (response: any) => (this.courses = response?.data || []),
      (error) => console.error('Error fetching courses:', error)
    );
  }

  addStudent() {
    this.http.post('http://localhost:5000/api/students/add', this.newStudent).subscribe(
      () => {
        alert('Student added successfully!');
        this.newStudent = {
          name: '',
          email: '',
          password: '',
          enrollment_number: '',
          course_id: null,
          semester: null,
          parent_contact: '',
        };
        this.getStudents();
      },
      (error) => console.error('Error adding student:', error)
    );
  }
  

  openEditModal(student: any) {
    this.selectedStudent = { ...student };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveStudentChanges() {
    this.http
      .put(`http://localhost:5000/api/students/update/${this.selectedStudent.student_id}`, this.selectedStudent)
      .subscribe(
        () => {
          alert('Student updated successfully!');
          this.getStudents();
          this.closeModal();
        },
        (error) => console.error('Error updating student:', error)
      );
  }

  deleteStudent(studentId: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.http.delete(`http://localhost:5000/api/students/delete/${studentId}`).subscribe(
        () => {
          alert('Student deleted successfully!');
          this.getStudents();
        },
        (error) => console.error('Error deleting student:', error)
      );
    }
  }

  getStudentsByCourse() {
    if (!this.selectedCourseId) return;

    this.http.get(`http://localhost:5000/api/students/course/${this.selectedCourseId}`).subscribe(
      (response: any) => {
        this.filteredStudents = response?.data || [];
      },
      (error) => console.error('Error fetching students by course:', error)
    );
  }
}
