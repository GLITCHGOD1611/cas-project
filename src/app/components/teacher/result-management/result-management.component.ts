import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-result-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './result-management.component.html',
  styleUrls: ['./result-management.component.css'],
})
export class ResultManagementComponent implements OnInit {
  newResult = {
    student_id: null,
    exam_id: null,
    marks_obtained: null,
    total_marks: null,
    grade: '',
  };

  results: any[] = [];
  students: any[] = [];
  exams: any[] = [];
  isEditing: boolean = false;
  selectedResult: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchResults();
    this.fetchStudents();
    this.fetchExams();
  }

  fetchResults() {
    this.http.get('http://localhost:5000/api/results').subscribe(
      (response: any) => {
        this.results = response.data || [];
      },
      (error) => console.error('Error fetching results:', error)
    );
  }

  fetchStudents() {
    this.http.get('http://localhost:5000/api/students').subscribe(
      (response: any) => {
        this.students = response.data || [];
      },
      (error) => console.error('Error fetching students:', error)
    );
  }

  fetchExams() {
    this.http.get('http://localhost:5000/api/exams').subscribe(
      (response: any) => {
        this.exams = response.data || [];
      },
      (error) => console.error('Error fetching exams:', error)
    );
  }

  addResult() {
    this.http.post('http://localhost:5000/api/results', this.newResult).subscribe(
      (response) => {
        alert('Result added successfully!');
        this.fetchResults(); // Refresh the result list
      },
      (error) => console.error('Error adding result:', error)
    );
  }

  editResult(row: any) {
    this.selectedResult = { ...row }; // Copy the data into selectedResult for editing
    this.isEditing = true; // Enable editing
  }

  saveResult(row: any) {
    this.http.put(
      `http://localhost:5000/api/results/${row.result_id}`,
      row
    ).subscribe(
      (response) => {
        alert('Result updated successfully!');
        this.fetchResults(); // Refresh the result list
        this.isEditing = false; // Disable editing
      },
      (error) => console.error('Error updating result:', error)
    );
  }

  deleteResult(resultId: number) {
    if (confirm('Are you sure you want to delete this result?')) {
      this.http.delete(`http://localhost:5000/api/results/${resultId}`).subscribe(
        (response) => {
          alert('Result deleted successfully!');
          this.fetchResults(); // Refresh the result list
        },
        (error) => console.error('Error deleting result:', error)
      );
    }
  }
}
