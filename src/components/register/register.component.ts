import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  title='register'
  user: any = {email: '', password: '',userName:''}; // Object to store user registration data

  constructor(private router: Router, private http: HttpClient) {}

  register() {
    this.http.post('http://localhost:5017/api/Account/register', this.user, { responseType: 'text' }).subscribe(
      response => {
        console.log('Registration successful:', response);
        // Optionally, you can redirect the user to the login page after successful registration
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Registration failed:', error);
        // Handle registration failure, e.g., display an error message to the user
      }
    );
  }
  

  redirectToGoogle(): void {
    window.location.href = 'https://accounts.google.com';
  }

  redirectToFacebook(): void {
    window.location.href = 'https://www.facebook.com';
  }
  
  
}

