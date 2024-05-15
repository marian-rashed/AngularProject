import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { ProfileService } from '../../Services/profile.service';
import { UserData } from '../../Interfaces/user-data';
import { Post } from '../../Interfaces/post';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { CommentService } from '../../Services/comment.service';
import { Comment } from '../../Interfaces/comment';
import { React } from '../../Interfaces/react';
import { ReactService } from '../../Services/react.service';
import { PostsServiceService } from '../../Services/posts-service.service';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
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
  reacts: React[] = [];
  newReact: React = { id: 0, value: true, userId: '', postId: 0 };
  newComment: Comment = { id: 0, content: '', userId: '', postId: 0,commentTime:"2024-05-11T19:22:55.413Z" };
  CommentContent:string = '';

  selectedFile: File = new File([], '');
  selectedPost: Post | null = null; // To store the selected post for editing
  updatedPost: Post = {
    id: 0,
    userId: '',
    content: '',
    postImage: '',
    postTime: '',
  }; // To store the updated post data
  selectedComment: Comment | null = null; 
updatedComment: Comment = 
{
  id:0,
  content:"",
  commentTime:"",
  postId:0,
  userId:""
};
  
  reactOnPost: {
    [postId: number]: { likeCount: number; dislikeCount: number };
  } = {};
  CommentsForPost:Comment[] = [];
  selectedPostId: number | null = null;




  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private profileService: ProfileService,
    private _PostsServiceService: PostsServiceService,
    private _ReactService: ReactService,
    private _CommentService: CommentService
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
              this.UserPosts.forEach((post) => this.fetchReactCounts(post.id));
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
  fetchReactCounts(postId: number): void {
    this._PostsServiceService.getReactsNum(postId).subscribe({
      next: (res) => {
        this.reactOnPost[postId] = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
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

  reactsNumber(postid: number) {
    this._PostsServiceService.getReactsNum(postid).subscribe({
      next: (res) => {
        this.reactOnPost[postid] = res;
        console.log(this.reactOnPost);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  isPostImageString(item: any): boolean {
    return item.postImage !== 'string';
  }

  deletePost(post: Post) {
    console.log(this.UserPosts);
    console.log(post);
    if ((post && post.id) != null) {
      this._PostsServiceService.DeletePost(post.id).subscribe({
        next: () => {
          this.UserPosts = this.UserPosts.filter((item) => item.id !== post.id);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.error('Invalid post object or missing post ID:', post);
    }
  }

  editPost(post: Post): void {
    this.selectedPost = post;
    this.selectedPost.id = post.id;
    this.updatedPost.content = post.content; // Assign initial content to updatedPost
    this.updatedPost.postImage = post.postImage; // Assign initial post image to updatedPost
  }

  updateContent(event: any): void {
    const target = event.target as HTMLTextAreaElement;
    this.updatedPost.content = target.value; // Update updatedPost content when input changes
  }

  cancelEdit(): void {
    this.selectedPost = null;
    this.updatedPost.content = '';
    this.updatedPost.postImage = '';
  }

  handleImageInput(event: any): void {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.updatedPost.postImage = reader.result as string;
    };
  }

  saveEdit(): void {
    if (this.selectedPost) {
      this.selectedPost.content = this.updatedPost.content;
      this.selectedPost.postImage = this.updatedPost.postImage;
      this._PostsServiceService
        .EditPost(this.selectedPost.id, this.selectedPost)
        .subscribe({
          next: () => {
            this.selectedPost = null;
            this.updatedPost.content = '';
            this.updatedPost.postImage = '';
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  addReact(postId: number, value: boolean): void {
    this.newReact.userId = this.loggedInUserId;
    this.newReact.postId = postId;
    this.newReact.value = value;
    this._ReactService.addReact(this.newReact).subscribe({
      next: () => {
        // After adding the reaction, update the counts
        this.fetchReactCounts(postId);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateReactValue(postId: number, newValue: boolean): void {
    const existingReact = this.reacts.find(
      (react) => react.postId === postId && react.userId === this.loggedInUserId
    );

    if (existingReact) {
      if (existingReact.value !== newValue) {
        existingReact.value = newValue;
        this._ReactService
          .EditReact(existingReact.id, existingReact)
          .subscribe({
            next: () => {
              const index = this.reacts.findIndex(
                (react) => react.id === existingReact.id
              );
              if (index !== -1) {
                this.reacts[index] = existingReact;
                this.fetchReactCounts(postId);
              }
            },
            error: (err) => {
              console.log(err);
            },
          });
      } else {
        this.addReact(postId, newValue);
      }
    } else {
      this.addReact(postId, newValue);
    }
  }

  isCurrentUserLiked(postId: number): boolean {
    const userReaction = this.reacts.find(
      (react) => react.postId === postId && react.userId === this.loggedInUserId
    );
    return userReaction ? userReaction.value === true : false;
  }

  isCurrentUserDisliked(postId: number): boolean {
    const userReaction = this.reacts.find(
      (react) => react.postId === postId && react.userId === this.loggedInUserId
    );
    return userReaction ? userReaction.value === false : false;
  }

  onCreateNewComment(postid:number) {
    this.newComment.content = this.CommentContent;
    //this.newComment.commentTime = Date.now().toLocaleString();
    this.newComment.postId = postid;
    this.newComment.userId = this.loggedInUserId
    this._CommentService.addComment(this.newComment).subscribe({
      next:() => {
        console.log(this.newComment)
      },
      error:(err) => {
        console.log(err);
        console.log(this.newComment)
      }
    });
  }

  deleteComment(Comment: Comment) {
    this._CommentService.DeleteComment(Comment.id).subscribe({
      next:()=>{
        this.getCommentsbyPost(Comment.postId);
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  //missing the front (html)
  
  editComment(comment: Comment): void {
    this.selectedComment = comment;
    this.updatedComment.content = comment.content;
    this.selectedComment.id=comment.id;
  }
  
  updateCommentContent(event: any): void {
    const target = event.target as HTMLTextAreaElement;
    this.updatedComment.content = target.value; // Update updatedCommentContent when input changes
  }
  
  cancelEditComment(): void {
    this.selectedComment = null;
    this.updatedComment.content = '';
  }
  
  saveEditComment(): void {
    if (this.selectedComment) {
      this.selectedComment.content = this.updatedComment.content;
      this._CommentService
        .EditComment(this.selectedComment.id, this.selectedComment)
        .subscribe({
          next: () => {
            this.selectedComment = null;
            this.updatedComment.content = '';
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }


// get comment by post id missing the front (html) implemntation
// i thing the right way is when i click on comment icon it is open a model contain commnt
  getCommentsbyPost(postid:number) {
    this._CommentService.getCommentForPost(postid).subscribe({
      next:(res) => {
        this.CommentsForPost = res;
      },
      error:(err) => {
        console.log(err);
      }
    })
  }

  toggleComments(post: Post): void {
    // If the clicked post is already selected, deselect it
    if (this.selectedPostId === post.id) {
        this.selectedPostId = null;
        this.CommentsForPost = [];
    } else {
        
        this.selectedPostId = post.id;
        this.getCommentsbyPost(post.id);
    }
}
}
