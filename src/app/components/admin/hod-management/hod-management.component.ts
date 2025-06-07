import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hod-management',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './hod-management.component.html',
  styleUrl: './hod-management.component.css'
})
export class HodManagementComponent {

  hods: any[] = [];
  teachers: any[] = [];
  newHOD = {
    teacher_id: null,
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getHODs();
    this.getTeachers();
  }

  getHODs() {
    this.http.get('http://localhost:5000/api/hod/hods').subscribe(
      (response: any) => {
        this.hods = response.data || [];
      },
      (error) => console.error('Error fetching HODs:', error)
    );
  }

  getTeachers() {
    this.http.get('http://localhost:5000/api/teacher/teachers').subscribe(
      (response: any) => {
        this.teachers = response.data || [];
      },
      (error) => console.error('Error fetching teachers:', error)
    );
  }

  addHOD() {
    this.http.post('http://localhost:5000/api/hod/hods/add', this.newHOD).subscribe(
      () => {
        alert('HOD added successfully!');
        this.newHOD = { teacher_id: null };
        this.getHODs();
      },
      (error) => console.error('Error adding HOD:', error)
    );
  }

  deleteHOD(hodId: number) {
    if (confirm('Are you sure you want to delete this HOD?')) {
      this.http.delete(`http://localhost:5000/api/hod/hods/delete/${hodId}`).subscribe(
        () => {
          alert('HOD deleted successfully!');
          this.getHODs();
        },
        (error) => console.error('Error deleting HOD:', error)
      );
    }
  }

}
