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
  credentials = { email: '', password: '' };

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
        this.router.navigate(['/home']); // Redirect to home page
      },
      (error) => {
        console.log('Login failed:', error);
      }
    );
  }
}
