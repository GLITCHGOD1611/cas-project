import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-announcement-management',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './announcement-management.component.html',
  styleUrl: './announcement-management.component.css'
})
export class AnnouncementManagementComponent {

  announcements: any[] = [];
  newAnnouncement = {
    title: '',
    description: '',
    created_by: '', // Entered manually
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAnnouncements();
  }

  getAnnouncements() {
    this.http.get('http://localhost:5000/api/').subscribe(
      (response: any) => (this.announcements = response.data || []),
      (error) => console.error('Error fetching announcements:', error)
    );
  }

  addAnnouncement() {
    if (!this.newAnnouncement.title || !this.newAnnouncement.description || !this.newAnnouncement.created_by) {
      alert('All fields are required!');
      return;
    }

    this.http.post('http://localhost:5000/api/add', this.newAnnouncement).subscribe(
      () => {
        alert('Announcement added successfully!');
        this.newAnnouncement = { title: '', description: '', created_by: '' };
        this.getAnnouncements();
      },
      (error) => console.error('Error adding announcement:', error)
    );
  }

  deleteAnnouncement(id: number) {
    if (confirm('Are you sure you want to delete this announcement?')) {
      this.http.delete(`http://localhost:5000/api/delete/${id}`).subscribe(
        () => {
          alert('Announcement deleted successfully!');
          this.getAnnouncements();
        },
        (error) => console.error('Error deleting announcement:', error)
      );
    }
  }
  }

