import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  credentials = { email: '', password: '' };
  route: ActivatedRoute | null | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  redirectToGoogle(): void {
    window.location.href = 'https://accounts.google.com';
  }

  redirectToFacebook(): void {
    window.location.href = 'https://www.facebook.com';
  }

  signIn(): void {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        this.authService.setToken(response.token); // Store token in localStorage

        // Set query parameters to be accessed by all components
        this.authService.setQueryParams({ email: this.credentials.email });

        // Redirect to the home component
        this.router.navigate(['/home']);
      },
      (error) => {
        console.log('Login failed:', error);
      }
    );
  }
}
