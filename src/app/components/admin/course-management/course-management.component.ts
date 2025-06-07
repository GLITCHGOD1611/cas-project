import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddCourceComponent } from '../add-cource/add-cource.component';

@Component({
  selector: 'app-course-management',
  standalone: true,
  imports: [FormsModule,CommonModule,AddCourceComponent],
  templateUrl: './course-management.component.html',
  styleUrl: './course-management.component.css'
})
export class CourseManagementComponent {
  courses: any[] = [];
  newCourse = {
    course_name: '',
    course_description: '',
    duration: 0,
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getCourses();
  }

  // Fetch all courses
  getCourses() {
    this.http.get('http://localhost:5000/api/course/list').subscribe({
      next: (response: any) => {
        this.courses = response.data;
      },
      error: (err) => {
        console.error(err);
        alert('Failed to fetch courses');
      },
    });
  }

  // Add a new course
  addCourse() {
    this.http.post('http://localhost:5000/api/course/add', this.newCourse).subscribe({
      next: () => {
        alert('Course added successfully!');
        this.newCourse = { course_name: '', course_description: '', duration: 0 }; // Reset form
        this.getCourses(); // Refresh the list
      },
      error: (err) => {
        console.error(err);
        alert('Failed to add course');
      },
    });
  }

  editCourse(course: any) {
    // Create a local copy of the course to edit
    const updatedCourse = { ...course };
  
    // Open a form or modal for the user to edit course details
    const updatedName = prompt('Enter new course name:', updatedCourse.course_name);
    const updatedDescription = prompt('Enter new course description:', updatedCourse.course_description);
    const updatedDuration = prompt('Enter new course duration:', updatedCourse.duration.toString());
  
    if (updatedName && updatedDuration) {
      updatedCourse.course_name = updatedName;
      updatedCourse.course_description = updatedDescription || updatedCourse.course_description;
      updatedCourse.duration = +updatedDuration;
  
      // Call the API to update the course
      this.http
        .put(`http://localhost:5000/api/course/update/${updatedCourse.course_id}`, updatedCourse)
        .subscribe({
          next: () => {
            alert('Course updated successfully!');
            this.getCourses(); // Refresh the list
          },
          error: (err) => {
            console.error('Failed to update course:', err);
            alert('Failed to update course');
          },
        });
    } else {
      alert('Course name and duration are required.');
    }
  }
  

  // Delete a course
  deleteCourse(courseId: number) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.http
        .delete(`http://localhost:5000/api/course/delete/${courseId}`)
        .subscribe({
          next: () => {
            alert('Course deleted successfully!');
            this.getCourses(); // Refresh the list
          },
          error: (err) => {
            console.error(err);
            alert('Failed to delete course');
          },
        });
    }
  }
}
