import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-local-storage-test',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './local-storage-test.component.html',
  styleUrls: ['./local-storage-test.component.css']
})
export class LocalStorageTestComponent {
  storedValue: string | null = null;

  // Save data to localStorage
  saveData() {
    localStorage.setItem('myKey', 'Hello, LocalStorage is working!');
    alert('Data Saved in LocalStorage!');
  }

  // Load data from localStorage
  loadData() {
    this.storedValue = localStorage.getItem('myKey');
  }

  // Clear data from localStorage
  clearData() {
    localStorage.removeItem('myKey');
    this.storedValue = null;
    alert('LocalStorage Cleared!');
  }
}
