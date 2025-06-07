import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private roleSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private cookieService: CookieService) {
    this.initializeRole(); // Decode token or cookie and set role
  }

  // Get the current role as an Observable
  getRole(): Observable<string | null> {
    return this.roleSubject.asObservable();
  }

  // Set a new role
  setRole(role: string): void {
    this.cookieService.set('role', role); // Store role in cookie
    this.roleSubject.next(role);
    console.log(`RoleService: Role set to ${role}`);
  }

  // Clear the role
  clearRole(): void {
    this.cookieService.delete('role'); // Delete the cookie
    this.roleSubject.next(null);
    console.log('RoleService: Role cleared');
  }

  // Initialize role from cookie
  private initializeRole(): void {
    const role = this.cookieService.get('role'); // Get role from cookie
    if (role) {
      this.roleSubject.next(role);
      console.log('RoleService: Role initialized as', role);
    } else {
      this.roleSubject.next(null); // Clear if no cookie is found
    }
  }
}
