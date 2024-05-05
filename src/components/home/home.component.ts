import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsServiceService } from '../../Services/posts-service.service';
import { Post } from '../../Interfaces/post';
import { AuthService } from '../../Services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  users = [
    { imageUrl: '../../assets/Images/hagar.jpg', name: 'John Doe', email: 'john@example.com' },
    { imageUrl: '../../assets/Images/hagar.jpg', name: 'Jane Smith', email: 'jane@example.com' },
    { imageUrl: '../../assets/Images/hagar.jpg', name: 'John Doe', email: 'john@example.com' },
    { imageUrl: '../../assets/Images/hagar.jpg', name: 'Jane Smith', email: 'jane@example.com' },
    { imageUrl: '../../assets/Images/hagar.jpg', name: 'John Doe', email: 'john@example.com' },
    { imageUrl: '../../assets/Images/hagar.jpg', name: 'Jane Smith', email: 'jane@example.com' },
  ];
  items: Post[] = [];
  newPost: Post = { userId: '', content: '', postImage: 'string', postTime: '2024-04-29 16:43:04.3630000', id: 0 };
  loggedInUserId: string | null = null;
  email: string | null = null;
  selectedFile: File = new File([], '');
  selectedPost: Post | null = null; // To store the selected post for editing
  updatedPost: Post = { id: 0, userId: '', content: '', postImage: '', postTime: '' }; // To store the updated post data


  constructor(
    private _PostsServiceService: PostsServiceService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  

  
  ngOnInit(): void {
    this.loadPosts();
    this.initializeNewPost();
    this.fetchLoggedInUserId();
  }


  loadPosts(): void {
    this._PostsServiceService.GetAllPosts().subscribe({
      next: (res) => { this.items = res },
      error: (err) => { console.log(err) }
    });
  }

  initializeNewPost(): void {
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate, 'yyyy-MM-ddTHH:mm:ss', 'en-US');
    this.newPost.postTime = formattedDate;
  }

  fetchLoggedInUserId(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      if (this.email) {
        this.authService.getCurrentUser(this.email).subscribe({
          next: (user) => { this.loggedInUserId = user.userId; },
          error: (err) => { console.log(err); }
        });
      }
    });
  }

  isPostImageString(item: any): boolean {
    return item.postImage !== "string";
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
          this.items = this.items.filter(item => item.id !== post.id);
        },
        error: (err) => { console.log(err); }
      });
    } else {
      console.error('Invalid post object or missing post ID:', post);
    }
  }


  editPost(post: Post): void {
    this.selectedPost = post;
    this.selectedPost.id=post.id;
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
      this._PostsServiceService.EditPost(this.selectedPost.id, this.selectedPost).subscribe({
          next: () => {
            
              this.selectedPost = null;
              this.updatedPost.content = ''; 
              this.updatedPost.postImage = ''; 
          },
          error: (err) => {
              console.log(err);
          }
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
      }
    });
  }


}
