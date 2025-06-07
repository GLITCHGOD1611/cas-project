import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes'; // Ensure you have a `routes` configuration

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Provide HttpClient globally
    provideRouter(routes), // Provide the routing configuration
  ],
}).catch((err) => console.error(err));
