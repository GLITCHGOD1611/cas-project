import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-admin',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css'],
})
export class AddAdminComponent {
  admin = {
    name: '',
    email: '',
    password: '',
    contact_number: '',
  };

  constructor(private http: HttpClient) {}

  addAdmin() {
    this.http.post('http://localhost:5000/api/admin/admins', this.admin).subscribe({
      next: (response) => {
        alert('Admin added successfully!');
        this.admin = { name: '', email: '', password: '', contact_number: '' }; // Reset form
      },
      error: (err) => {
        console.error(err);
        alert('Failed to add admin.');
      },
    });
  }
}
