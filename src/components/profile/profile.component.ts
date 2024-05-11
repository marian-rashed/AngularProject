import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loggedInUserId: string | null = null;
  email: string | null = null; // Changed to null instead of undefined
  error: string | null = null;

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchLoggedInUserId();
  }

  fetchLoggedInUserId(): void {
    this.email = this.authService.getQueryParam('email');
      console.log(this.email)
      if (this.email) {
        this.authService.getCurrentUser(this.email).subscribe({
          next: (user) => { this.loggedInUserId = user.userId;console.log(this.loggedInUserId,'---',user.userId) },
          error: (err) => { console.log(err); }
        });
      }
    
  }
}
