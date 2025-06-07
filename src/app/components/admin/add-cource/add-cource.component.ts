import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-add-cource',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-cource.component.html',
  styleUrl: './add-cource.component.css'
})
export class AddCourceComponent {
  course = {
    course_name: '',
    course_description: '',
    duration: 0,
  };

  constructor(private http: HttpClient) {}

  addCourse() {
    this.http.post('http://localhost:5000/api/course/add', this.course).subscribe({
      next: (response) => {
        alert('Course added successfully!');
        this.course = { course_name: '', course_description: '', duration: 0 }; // Reset form

      },
      error: (err) => {
        console.error(err);
        alert('Failed to add course.');
      },
    });
  }
}
