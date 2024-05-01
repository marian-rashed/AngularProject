import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
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
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  redirectToGoogle(): void {
    window.location.href = 'https://accounts.google.com';
  }

  redirectToFacebook(): void {
    window.location.href = 'https://www.facebook.com';
  }

  signIn() {
    // Call authService method to check authentication
    const isAuthenticated = this.authService.checkIfUserIsAuthenticated();

    if (isAuthenticated) {
      this.router.navigate(['/home']); // Redirect to home page if authentication successful
    } else {
      // Handle authentication failure (e.g., show error message)
      console.log('Authentication failed');
    }
  }
}
