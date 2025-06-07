// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class storageService {
  private currentUserSubject: BehaviorSubject<any>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
  }

  get currentUserValue() {
    return this.currentUserSubject.value;
  }

  // Example: you can store the JWT token with the teacher info
  setUser(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  // Example: a method to decode the JWT and get the user ID
  decodeToken() {
    const token = this.currentUserSubject.value.token;
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      return decoded.teacher_id;
    }
    return null;
  }
}
