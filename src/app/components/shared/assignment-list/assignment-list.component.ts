import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assignment-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // ✅ Added HttpClientModule
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.css'] // ✅ Fixed `styleUrls`
})

export class AssignmentListComponent implements OnInit {
  assignments: any[] = []; // ✅ Starts as an empty array
  subjects: any[] = []; // ✅ Stores subject list
  teachers: any[] = []; // ✅ Stores teacher list

  private apiUrl = 'http://localhost:5000/api/assignments'; // ✅ Ensure API is correct
  private subjectsUrl = 'http://localhost:5000/api/subjects/subjects';
  private teachersUrl = 'http://localhost:5000/api/teacher/teachers';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAssignments();
    this.fetchSubjects();
    this.fetchTeachers();
  }

  // ✅ Fetch assignments
  fetchAssignments() {
    this.http.get<any>(this.apiUrl).subscribe(
      (response) => {
        this.assignments = response.data || [];
      },
      (error) => console.error('Error fetching assignments:', error)
    );
  }

  // ✅ Fetch subjects
  fetchSubjects() {
    this.http.get<any>(this.subjectsUrl).subscribe(
      (response) => {
        this.subjects = response.data || [];
      },
      (error) => console.error('Error fetching subjects:', error)
    );
  }

  // ✅ Fetch teachers
  fetchTeachers() {
    this.http.get<any>(this.teachersUrl).subscribe(
      (response) => {
        this.teachers = response.data || [];
      },
      (error) => console.error('Error fetching teachers:', error)
    );
  }

  // ✅ Get Subject Name by ID
  getSubjectName(subjectId: number): string {
    const subject = this.subjects.find((s) => s._id === subjectId);
    return subject ? subject.subject_name : 'N/A';
  }
  

  // ✅ Get Teacher Name by ID
  getTeacherName(teacherId: number): string {
    const teacher = this.teachers.find((t) => t.id === teacherId);
    return teacher ? teacher.name : 'N/A';
  }
}
