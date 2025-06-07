import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exam-management',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './exam-management.component.html',
  styleUrl: './exam-management.component.css'
})
export class ExamManagementComponent implements OnInit {
  newExam = {
    subject_id: null,
    exam_name: '',
    exam_date: '',
    duration: null
  };
  exams: any[] = [];
  subjects: any[] = [];
  selectedExam: any = {};
  isModalOpen: boolean = false; // Flag to control modal visibility

  constructor(private http: HttpClient, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.fetchExams();
    this.fetchSubjects();
  }

  fetchExams() {
    this.http.get('http://localhost:5000/api/exams').subscribe(
      (response: any) => {
        this.exams = response.data || [];
      },
      (error) => console.error('Error fetching exams:', error)
    );
  }

  fetchSubjects() {
    this.http.get('http://localhost:5000/api/subjects/subjects').subscribe(
      (response: any) => {
        this.subjects = response.data || [];
      },
      (error) => console.error('Error fetching subjects:', error)
    );
  }

  addExam() {
    this.http.post('http://localhost:5000/api/exams', this.newExam).subscribe(
      (response) => {
        alert('Exam added successfully!');
        this.fetchExams(); // Refresh the exams list
      },
      (error) => console.error('Error adding exam:', error)
    );
  }

  openEditModal(exam: any) {
    this.selectedExam = { ...exam }; // Copy the selected exam data into selectedExam
    this.isModalOpen = true; // Open modal

    // Apply background blur
    document.body.classList.add('blur-background');
  }

  closeModal() {
    this.isModalOpen = false; // Close modal

    // Remove background blur
    document.body.classList.remove('blur-background');
  }

  updateExam() {
    if (!this.selectedExam.exam_id) {
      alert('Invalid exam data. Cannot update.');
      return;
    }

    this.http.put(
      `http://localhost:5000/api/exams/${this.selectedExam.exam_id}`,
      this.selectedExam
    ).subscribe(
      (response) => {
        alert('Exam updated successfully!');
        this.fetchExams(); // Refresh the exams list
        this.closeModal(); // Close modal after update
      },
      (error) => console.error('Error updating exam:', error)
    );
  }

  deleteExam(examId: number) {
    if (confirm('Are you sure you want to delete this exam?')) {
      this.http.delete(`http://localhost:5000/api/exams/${examId}`).subscribe(
        (response) => {
          alert('Exam deleted successfully!');
          this.fetchExams(); // Refresh the exams list
        },
        (error) => console.error('Error deleting exam:', error)
      );
    }
  }
}

