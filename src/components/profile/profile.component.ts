import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { ProfileService } from '../../Services/profile.service';
import { UserData } from '../../Interfaces/user-data';
import { Post } from '../../Interfaces/post';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  loggedInUserId: string | null = null;
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
  UserPosts: Post[] = [];
  updatedUserData: any =
    {
      id: '',
      email: '',
      name: '',
      profileIamge: '',
      coverImage: '',
      userName: '',
      bio: '',
      location: ''
    };
  newBio: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private profileService: ProfileService
  ) { }

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
              this.updatedUserData.id = this.UserDataObj.id;
              this.updatedUserData.email = this.UserDataObj.email;
              this.updatedUserData.name = this.UserDataObj.name;
              this.updatedUserData.userName = this.UserDataObj.userName;
              this.updatedUserData.bio = this.UserDataObj.bio;
              this.updatedUserData.profileIamge = this.UserDataObj.profileImage;
              this.updatedUserData.coverImage = this.UserDataObj.coverImage;
              console.log(this.updatedUserData);
              console.log(this.UserDataObj);
            },
            error: (err) => {
              console.log(err);
            }
          });
          this.profileService.GetUserPosts(this.loggedInUserId).subscribe({
            next: (userPosts) => {
              this.UserPosts = userPosts
              console.log(this, this.loggedInUserId)
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

  onCoverPhotoSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.updatedUserData.coverImage = reader.result as string;
      this.editUserData();
    };
  }

  // Method to handle personal photo selection
  onPersonalPhotoSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.updatedUserData.profileIamge = reader.result as string;
      this.editUserData();
    };
  }
  // Method to update bio
  updateBio(): void {
    this.updatedUserData.bio = this.newBio;
    this.editUserData();
  }

  // Method to edit user data
  editUserData(): void {


    this.profileService.editUserData(this.updatedUserData).subscribe({
      next: () => {
        console.log(this.updatedUserData);
        this.UserDataObj.coverImage=this.updatedUserData.coverImage;
        this.UserDataObj.profileImage=this.updatedUserData.profileIamge;
        this.UserDataObj.bio=this.updatedUserData.bio;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
