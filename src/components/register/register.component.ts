import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  title='register'
 

  constructor(private router: Router) { }

  redirectToGoogle(): void {
    window.location.href = 'https://accounts.google.com';
  }
  redirectToFacebook(): void {
    window.location.href = 'https://www.facebook.com';
  }
  
  
  
}

