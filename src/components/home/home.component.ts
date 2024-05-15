import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsServiceService } from '../../Services/posts-service.service';
import { Post } from '../../Interfaces/post';
import { AuthService } from '../../Services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import { React } from '../../Interfaces/react';
import { ReactService } from '../../Services/react.service';
import { forkJoin } from 'rxjs';
import { CommentService } from '../../Services/comment.service';
import { Comment } from '../../Interfaces/comment';
import { FormsModule } from "@angular/forms";
import { ReplayService } from '../../Services/replay.service';
import { Replay } from '../../Interfaces/replay';
import {SuggestionService} from '../../Services/suggestion.service';
import {UserData}from '../../Interfaces/user-data';
declare var $: any;
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {

  users = this._SuggestionService.getUserIds("200a41ca-db27-46d6-9b2d-2f8397f18252");
  /*[
    {
      imageUrl: '../../assets/Images/hagar.jpg',
      name: 'John Doe',
      email: 'john@example.com',
    },
    {
      imageUrl: '../../assets/Images/hagar.jpg',
      name: 'Jane Smith',
      email: 'jane@example.com',
    },
    {
      imageUrl: '../../assets/Images/hagar.jpg',
      name: 'John Doe',
      email: 'john@example.com',
    },
    {
      imageUrl: '../../assets/Images/hagar.jpg',
      name: 'Jane Smith',
      email: 'jane@example.com',
    },
    {
      imageUrl: '../../assets/Images/hagar.jpg',
      name: 'John Doe',
      email: 'john@example.com',
    },
    {
      imageUrl: '../../assets/Images/hagar.jpg',
      name: 'Jane Smith',
      email: 'jane@example.com',
    },
  ];*/
  
  items: Post[] = [];
  newPost: Post = {
    userId: '',
    content: '',
    postImage: 'string',
    postTime: '2024-04-29 16:43:04.3630000',
    id: 0,
  };
  reacts: React[] = [];
  newReact: React = { id: 0, value: true, userId: '', postId: 0 };
  newComment: Comment = { id: 0, content: '', userId: '', postId: 0,commentTime:"2024-05-11T19:22:55.413Z" };
  CommentContent:string = '';
  loggedInUserId: string = '';
  email: string | null = null;
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
  RepliesForComment:Replay[] = [];
  CommentIdForReplay:number = 0;
  PostIdForReplay:number = 0;
  ReplayContent:string = '';
  constructor(
    private _PostsServiceService: PostsServiceService,
    private _ReactService: ReactService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private _CommentService: CommentService,
    private _ReplayService: ReplayService,
    private _SuggestionService:SuggestionService
  ) {}

  ngOnInit(): void {
    this.loadPosts();
    this.initializeNewPost();
    this.fetchLoggedInUserId();
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
  loadPosts(): void {
    this._PostsServiceService.GetAllPosts().subscribe({
      next: (res) => {
        this.items = res;
        this.items.forEach((post) => this.fetchReactCounts(post.id));
      },
      error: (err) => {
        console.log(err);
      },
    });
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

  initializeNewPost(): void {
    const currentDate = new Date();
    const formattedDate = formatDate(
      currentDate,
      'yyyy-MM-ddTHH:mm:ss',
      'en-US'
    );
    this.newPost.postTime = formattedDate;
    this.newComment.commentTime=formattedDate;
  }

  fetchLoggedInUserId(): void {

    this.email = this.authService.getQueryParam('email');
      console.log(this.email);

      if (this.email) {
        this.authService.getCurrentUser(this.email).subscribe({
          next: (user) => {
            this.loggedInUserId = user.userId;
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    
  }

  isPostImageString(item: any): boolean {
    return item.postImage !== 'string';
  }

  handleFileInput(event: any): void {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.newPost.postImage = reader.result as string;
    };
  }
  // onUpload() {
  //     const fileData = new FormData();
  //     fileData.append('file', this.selectedFile, this.selectedFile.name);
  //     this.http
  //       .post('http://localhost:5084/api/Values', fileData)
  //       .subscribe((res) => {
  //         console.log(res);

  //       });
  //     }
  updateContents(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.newPost.content = target.value;
  }

  deletePost(post: Post) {
    console.log(this.items);
    console.log(post);
    if ((post && post.id) != null) {
      this._PostsServiceService.DeletePost(post.id).subscribe({
        next: () => {
          this.items = this.items.filter((item) => item.id !== post.id);
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

  publish() {
    if (this.loggedInUserId) {
      this.newPost.userId = this.loggedInUserId;
    }

    this._PostsServiceService.addPost(this.newPost).subscribe({
      next: () => {
        this.loadPosts();
      },
      error: (err) => {
        console.log(err);
      },
    });
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
getAllReplay(commentid:number) {
  this._ReplayService.getRepliesForComment(commentid).subscribe({
    next:(res) => {
      this.RepliesForComment = res;
    },
    error:(err) => {
      console.log(err);
    }
  })
}
addNewReplay(newRplay:Replay){
  newRplay.userId = this.loggedInUserId;
  newRplay.commentId = this.CommentIdForReplay;
  newRplay.postId = this.PostIdForReplay;
  newRplay.replayTime = Date.now().toLocaleString();
  newRplay.content = this.ReplayContent;
  this._ReplayService.addReplay(newRplay).subscribe({
    next:() => {
      console.log(newRplay)
    },
    error:(err) => {
      console.log(err)
    }
  })
}
deleteReplay(replayId:number) {
  this._ReplayService.deleteReplay(replayId).subscribe({
    next:()=>{
      this.getAllReplay(this.CommentIdForReplay);
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
}
