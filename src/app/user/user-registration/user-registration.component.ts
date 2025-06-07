import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  roles = ['Admin', 'Faculty', 'Student'];
  selectedRole: string = 'Admin'; // Default role

  constructor(private fb: FormBuilder, private http: HttpClient) {
    // Initialize the form with common fields
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      // Role-specific fields (added dynamically)
      enrollmentNumber: [''], // For students
      contactNo: [''], // For students/faculty
      departmentId: [''], // For students/faculty
      admissionDate: [''], // For students
      hireDate: [''], // For faculty
    });
  }

  ngOnInit(): void {
    // Listen for role changes to update the form dynamically
    this.registrationForm.get('role')?.valueChanges.subscribe((role) => {
      this.selectedRole = role;
      this.updateFormFields(role);
    });
  }

  // Dynamically update form based on role
  updateFormFields(role: string): void {
    if (role === 'Student') {
      this.registrationForm.get('enrollmentNumber')?.setValidators(Validators.required);
      this.registrationForm.get('contactNo')?.setValidators(Validators.required);
      this.registrationForm.get('departmentId')?.setValidators(Validators.required);
      this.registrationForm.get('admissionDate')?.setValidators(Validators.required);

      // Clear unused fields
      this.registrationForm.get('hireDate')?.clearValidators();
    } else if (role === 'Faculty') {
      this.registrationForm.get('contactNo')?.setValidators(Validators.required);
      this.registrationForm.get('departmentId')?.setValidators(Validators.required);
      this.registrationForm.get('hireDate')?.setValidators(Validators.required);

      // Clear unused fields
      this.registrationForm.get('enrollmentNumber')?.clearValidators();
      this.registrationForm.get('admissionDate')?.clearValidators();
    } else {
      // Admin role: Clear all specific validators
      this.registrationForm.get('enrollmentNumber')?.clearValidators();
      this.registrationForm.get('contactNo')?.clearValidators();
      this.registrationForm.get('departmentId')?.clearValidators();
      this.registrationForm.get('admissionDate')?.clearValidators();
      this.registrationForm.get('hireDate')?.clearValidators();
    }

    // Update the form control states
    this.registrationForm.get('enrollmentNumber')?.updateValueAndValidity();
    this.registrationForm.get('contactNo')?.updateValueAndValidity();
    this.registrationForm.get('departmentId')?.updateValueAndValidity();
    this.registrationForm.get('admissionDate')?.updateValueAndValidity();
    this.registrationForm.get('hireDate')?.updateValueAndValidity();
  }

  // Submit form
  onSubmit(): void {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      console.log('Form Submitted:', formData);
  
      // Corrected endpoint URL
      this.http.post('http://localhost:5000/api/users/register', formData).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
        },
        error: (error) => {
          console.error('Registration failed:', error);
        },
      });
    } else {
      console.log('Form Invalid');
    }
  }
}  
