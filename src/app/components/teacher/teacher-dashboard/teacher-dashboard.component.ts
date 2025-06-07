// teacher-dashboard.component.ts
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {
  statistics = {
    total_students: 0,
    total_assignments: 0,
    total_attendance: 0,
    total_upcoming_exams: 0,
  };

  barChart: any;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Retrieve teacherId from localStorage
    const storedTeacherId = localStorage.getItem('teacherId');
    const teacherId = storedTeacherId !== null ? +storedTeacherId : undefined;  // Retrieve and parse the teacherId from localStorage

    if (teacherId) {
      this.http.get<any>(`http://localhost:5000/api/statistics/${teacherId}`).subscribe(
        (data) => {
          console.log('Response:', data);  
          this.statistics = data.data;
          this.createCharts();
        },
        (error) => {
          console.error('Error fetching teacher statistics', error);
        }
      );
    } else {
      console.error('Teacher ID not found in localStorage');
    }
  }

  createCharts(): void {
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    this.barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Students', 'Assignments', 'Attendance', 'Exams'],
        datasets: [
          {
            label: 'Counts',
            data: [
              this.statistics.total_students,
              this.statistics.total_assignments,
              this.statistics.total_attendance,
              this.statistics.total_upcoming_exams,
            ],
            backgroundColor: ['#007bff', '#17a2b8', '#ffc107', '#28a745'],
            borderColor: ['#0056b3', '#116970', '#b38600', '#1e7a38'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
