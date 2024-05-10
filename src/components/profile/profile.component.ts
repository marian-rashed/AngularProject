import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { ProfileService } from '../../Services/profile.service';
import { UserData } from '../../Interfaces/user-data'; // Import the UserData interface
import { Post } from '../../Interfaces/post';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  loggedInUserId: string | null = null;
  email: string | null = null;
  error: string | null = null;
  UserDataObj!: UserData;
  UserPosts:any[]=[]

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.fetchLoggedInUserId();
  }

  fetchLoggedInUserId(): void {
    this.email = this.authService.getQueryParam('email');
    console.log(this.email)
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
          });
          this.profileService.GetUserPosts(this.loggedInUserId).subscribe({
            next: (userPosts) => {
              this.UserPosts=userPosts
              console.log(this,this.loggedInUserId)
              console.log(this.UserPosts);
            },
            error: (err) => {
              console.log(err);
            }
          });
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
}
