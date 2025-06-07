import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isBrowser: boolean;

  constructor() {
    this.isBrowser = typeof window !== 'undefined';
  }

  setLoginState(isLoggedIn: boolean, role: string): void {
    if (this.isBrowser) {
      sessionStorage.setItem('isLoggedIn', isLoggedIn.toString());
      sessionStorage.setItem('role', role);
    }
  }

  getLoginState(): { isLoggedIn: boolean; role: string } {
    if (this.isBrowser) {
      const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
      const role = sessionStorage.getItem('role') || '';
      return { isLoggedIn, role };
    }
    return { isLoggedIn: false, role: '' };
  }

  logout(): void {
    if (this.isBrowser) {
      sessionStorage.removeItem('isLoggedIn');
      sessionStorage.removeItem('role');
    }
  }
}
