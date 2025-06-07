import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddAdminComponent } from '../add-admin/add-admin.component';

@Component({
  selector: 'app-manage-admins',
  standalone: true,
  imports: [FormsModule, CommonModule,AddAdminComponent],
  templateUrl: './manage-admins.component.html',
  styleUrls: ['./manage-admins.component.css'],
})
export class ManageAdminsComponent implements OnInit {
  admins: any[] = [];
  isEditing = false;
  editAdminId: number | null = null;
  editableAdmin: any = {
    name: '',
    email: '',
    contact_number: '',
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAdmins(); // Fetch admins on component load
  }

  getAdmins() {
    this.http.get('http://localhost:5000/api/admin/admins').subscribe({
      next: (response: any) => {
        if (response.success) {
          console.log('API Response:', response); // Debug: Print the full response
          this.admins = response.data; // Assign the "data" array to the admins array
        } else {
          alert('Failed to fetch admins.'); // Handle failure in response
        }
      },
      error: (err) => {
        console.error('HTTP Error:', err); // Debug: Log HTTP error
        alert('Failed to fetch admins.');
      },
    });
  }


  enableEdit(admin: any) {
    this.isEditing = true;
    this.editAdminId = admin.admin_id;
    this.editableAdmin = { ...admin }; // Copy the admin details to editableAdmin
  }

  // Save the updated admin
  saveAdmin() {
    if (this.editAdminId) {
      this.http
        .put(`http://localhost:5000/api/admin/admins/${this.editAdminId}`, this.editableAdmin)
        .subscribe({
          next: () => {
            alert('Admin updated successfully!');
            this.getAdmins(); // Refresh the list
            this.isEditing = false; // Exit edit mode
            this.editAdminId = null;
          },
          error: (err) => {
            console.error(err);
            alert('Failed to update admin');
          },
        });
    }
  }

  // Cancel editing
  cancelEdit() {
    this.isEditing = false;
    this.editAdminId = null;
    this.editableAdmin = { name: '', email: '', contact_number: '' };
  }

  // Delete admin
  deleteAdmin(adminId: number) {
    if (confirm('Are you sure you want to delete this admin?')) {
      this.http.delete(`http://localhost:5000/api/admin/admins/${adminId}`).subscribe({
        next: () => {
          alert('Admin deleted successfully!');
          this.getAdmins(); // Refresh the list
        },
        error: (err) => {
          console.error(err);
          alert('Failed to delete admin');
        },
      });
    }
  }
}
