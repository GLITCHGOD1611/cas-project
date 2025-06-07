import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth-service.service';
import { RoleService } from '../../components/role-service.service';
// Import the RoleService

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  role: string | null = null; // Role of the logged-in user (admin, teacher, student, hod)

  constructor(
    private authService: AuthService,
    private roleService: RoleService, // Inject the RoleService
    private router: Router
  ) {}

  ngOnInit(): void {
    this.roleService.getRole().subscribe((role) => {
      this.role = role;
      // console.log('NavbarComponent updated with role:', this.role);
    });
  }
  

  // Logout and clear role
  logout(): void {
    this.roleService.clearRole(); // Clear the role in the service
    this.authService.logout(); // Handle logout logic
    this.router.navigate(['/login']); // Redirect to login
  }

  activeDropdown: string | null = null;

toggleDropdown(menu: string) {
  this.activeDropdown = this.activeDropdown === menu ? null : menu;
}

}
