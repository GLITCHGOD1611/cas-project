import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Chart, registerables } from 'chart.js';


Chart.register(...registerables);

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  statistics = {
    students: 0,
    teachers: 0,
    courses: 0,
    hods: 0,
  };

  barChart: any;
  lineChart: any;
  pieChart: any;

  isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object // Check if running on the browser
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.fetchStatistics();
    }
  }

  fetchStatistics() {
    this.http.get('http://localhost:5000/api/dashboard/statistics').subscribe(
      (response: any) => {
        this.statistics = response.data || {};
        this.createCharts(); // Create charts after fetching data
      },
      (error) => console.error('Error fetching statistics:', error)
    );
  }

  createCharts() {
    if (this.isBrowser) {
      this.createBarChart();
      this.createLineChart();
      this.createPieChart();
    }
  }

  createBarChart() {
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    this.barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Students', 'Teachers', 'Courses', 'HODs'],
        datasets: [
          {
            label: 'Counts',
            data: [
              this.statistics.students,
              this.statistics.teachers,
              this.statistics.courses,
              this.statistics.hods,
            ],
            backgroundColor: ['#007bff', '#17a2b8', '#ffc107', '#28a745'],
            borderColor: ['#0056b3', '#116970', '#b38600', '#1e7a38'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  
  createLineChart() {
    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;
    this.lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Students', 'Teachers', 'Courses', 'HODs'],
        datasets: [
          {
            label: 'Counts Over Time',
            data: [
              this.statistics.students,
              this.statistics.teachers,
              this.statistics.courses,
              this.statistics.hods,
            ],
            borderColor: '#6f42c1',
            backgroundColor: 'rgba(111, 66, 193, 0.2)',
            fill: true,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });
  }
  
  createPieChart() {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Students', 'Teachers', 'Courses', 'HODs'],
        datasets: [
          {
            data: [
              this.statistics.students,
              this.statistics.teachers,
              this.statistics.courses,
              this.statistics.hods,
            ],
            backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4caf50'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      },
    });
  }
  
}
