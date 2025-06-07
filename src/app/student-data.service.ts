import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // This will make it available throughout the app
})
export class StudentDataService {
  private studentData: any = null; // In-memory storage for student data

  // Set the student data
  setStudentData(data: any): void {
    this.studentData = data;
  }

  // Get the student data
  getStudentData(): any {
    return this.studentData;
  }

  // Clear the student data (if needed)
  clearStudentData(): void {
    this.studentData = null;
  }
}
