import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
declare const bootstrap: any;

@Component({
  selector: 'app-assignment-management',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './assignment-management.component.html',
  styleUrls: ['./assignment-management.component.css'],
})
export class AssignmentManagementComponent implements OnInit {
  newAssignment = {
    title: '',
    description: '',
    subject_id: null,
    teacher_id: null,
    due_date: '',
  };

  assignments: any[] = [];
  subjects: any[] = [];
  teachers: any[] = [];
  selectedAssignment: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAssignments();
    this.fetchSubjects();
    this.fetchTeachers();
  }

  // Fetch all assignments from the backend
  fetchAssignments() {
    this.http.get('http://localhost:5000/api/assignments').subscribe(
      (response: any) => {
        this.assignments = response.data || [];
      },
      (error) => console.error('Error fetching assignments:', error)
    );
  }

  // Fetch subjects from the backend
  fetchSubjects() {
    this.http.get('http://localhost:5000/api/subjects/subjects').subscribe(
      (response: any) => {
        this.subjects = response.data || [];
      },
      (error) => console.error('Error fetching subjects:', error)
    );
  }

  // Fetch teachers from the backend
  fetchTeachers() {
    this.http.get('http://localhost:5000/api/teacher/teachers').subscribe(
      (response: any) => {
        this.teachers = response.data || [];
      },
      (error) => console.error('Error fetching teachers:', error)
    );
  }

  // Add a new assignment
  addAssignment() {
    this.http.post('http://localhost:5000/api/assignments', this.newAssignment).subscribe(
      (response) => {
        alert('Assignment added successfully!');
        this.fetchAssignments(); // Refresh the list
      },
      (error) => console.error('Error adding assignment:', error)
    );
  }

  // Open the edit modal with pre-filled data
  openEditModal(assignment: any) {
    this.selectedAssignment = { ...assignment };

    // Open modal logic using Bootstrap
    const modalElement = document.getElementById('editAssignmentModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  // Update assignment data
  updateAssignment() {
    if (!this.selectedAssignment.assignment_id) {
      alert('Invalid assignment data. Cannot update.');
      return;
    }

    this.http.put(
      `http://localhost:5000/api/assignments/${this.selectedAssignment.assignment_id}`,
      this.selectedAssignment
    ).subscribe(
      (response) => {
        alert('Assignment updated successfully!');
        this.fetchAssignments(); // Refresh the list
      },
      (error) => console.error('Error updating assignment:', error)
    );
  }

  // Delete an assignment
  deleteAssignment(assignmentId: number) {
    if (confirm('Are you sure you want to delete this assignment?')) {
      this.http.delete(`http://localhost:5000/api/assignments/${assignmentId}`).subscribe(
        (response) => {
          alert('Assignment deleted successfully!');
          this.fetchAssignments(); // Refresh the list
        },
        (error) => console.error('Error deleting assignment:', error)
      );
    }
  }
}
