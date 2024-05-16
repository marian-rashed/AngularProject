import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { ProfileService } from '../../Services/profile.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  loggedInUserId: string  = '';
  email: string | null = null;
  error: string | null = null;
  UserDataObj: any =
    {
      id: '',
      email: '',
      name: '',
      profileImage: '',
      coverImage: '',
      userName: '',
      bio: '',
      location: ''
    };
  showText = true;
  collapsed = false;
  iconSize = '24px'; // Initial icon size

  constructor(private authService: AuthService,
    private profileService: ProfileService
  ) {}
  ngOnInit(): void {
    this.fetchLoggedInUserId();


  }
  fetchLoggedInUserId() {
    this.email = this.authService.getQueryParam('email');
    console.log(this.email);

    if (this.email) {
      this.authService.getCurrentUser(this.email).subscribe({
        next: (user) => {
          this.loggedInUserId = user.userId;
          this.profileService.GetUserData(this.loggedInUserId).subscribe({
            next: (userData) => {
              this.UserDataObj = userData.data;
              console.log(this.UserDataObj);
            },
            error: (err) => {
              console.log(err);
            }
          })
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
  toggleIcons() {
    this.showText = !this.showText;
    this.iconSize = this.showText ? '24px' : '30px'; // Toggle icon size
    this.collapsed = !this.showText; // Toggle sidebar collapsed state
  }
  logout() {
    this.authService.logout();
  }
}
