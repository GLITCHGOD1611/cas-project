import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  email: string = '';
constructor() {}
// ngOnInit(): void {
//   // Retrieve the email stored in the service
//   this.email = this.gheidService.getEmail();
//   console.log('Email retrieved in footer:', this.email);  // Debugging log
// }
}
