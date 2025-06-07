import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subject-management',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './subject-management.component.html',
  styleUrl: './subject-management.component.css',
})
export class SubjectManagementComponent {
  subjects: any[] = [];
  courses: any[] = [];
  teachers: any[] = [];
  semesters: number[] = [1, 2, 3, 4, 5, 6, 7, 8]; // List of semesters

  newSubject = {
    subject_name: '',
    course_id: null,
    teacher_id: null,
    semester: null,
  };

  selectedSubject: any = {};
  showModal: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getSubjects();
    this.getCourses();
    this.getTeachers();
  }

  getSubjects() {
    this.http.get('http://localhost:5000/api/subjects/subjects').subscribe(
      (response: any) => (this.subjects = response?.data || []),
      (error) => console.error('Error fetching subjects:', error)
    );
  }

  getCourses() {
    this.http.get('http://localhost:5000/api/course/list').subscribe(
      (response: any) => (this.courses = response?.data || []),
      (error) => console.error('Error fetching courses:', error)
    );
  }

  getTeachers() {
    this.http.get('http://localhost:5000/api/teacher/teachers').subscribe(
      (response: any) => (this.teachers = response?.data || []),
      (error) => console.error('Error fetching teachers:', error)
    );
  }

  addSubject() {
    this.http.post('http://localhost:5000/api/subjects/subjects/add', this.newSubject).subscribe(
      () => {
        alert('Subject added successfully!');
        this.newSubject = {
          subject_name: '',
          course_id: null,
          teacher_id: null,
          semester: null,
        };
        this.getSubjects();
      },
      (error) => console.error('Error adding subject:', error)
    );
  }

  openEditModal(subject: any) {
    this.selectedSubject = { ...subject };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedSubject = {};
  }
  saveSubjectChanges() {
    if (!this.selectedSubject.subject_id) {
      alert('Subject ID is missing. Cannot update.');
      return;
    }
  
    // Send the updated subject details, including semester, to the backend
    this.http
      .put(`http://localhost:5000/api/subjects/subjects/update/${this.selectedSubject.subject_id}`, this.selectedSubject)
      .subscribe(
        () => {
          alert('Subject updated successfully!');
          this.getSubjects(); // Refresh the subject list
          this.closeModal(); // Close the modal
        },
        (error) => {
          console.error('Error updating subject:', error);
          alert('Failed to update the subject. Please try again.');
        }
      );
  }
  

  deleteSubject(subjectId: number) {
    if (confirm('Are you sure you want to delete this subject?')) {
      this.http.delete(`http://localhost:5000/api/subjects/subjects/delete/${subjectId}`).subscribe(
        () => {
          alert('Subject deleted successfully!');
          this.getSubjects();
        },
        (error) => console.error('Error deleting subject:', error)
      );
    }
  }
}

