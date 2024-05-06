import { Component,OnInit } from '@angular/core';
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
  
  items:Post[]=[];
  newPost: Post = { userId: '', content: '', postImage: 'string', postTime: '2024-04-29 16:43:04.3630000' };
  loggedInUserId: string | null = null; 
  email: string | null = null;
  selectedFile:File=new File([],'');
  constructor(
    private _PostsServiceService: PostsServiceService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this._PostsServiceService.GetAllPosts().subscribe({
      next: (res) => {this.items=res},
      error:(err)=>{console.log(err)}
    })

    const currentDate = new Date();
    const isoFormattedDate = currentDate.toISOString();
    this.newPost.postTime = isoFormattedDate
    // Fetch current user's details and set the userId in newPost
    this.route.queryParams.subscribe(params => {
      this.email = params['email']; // Get email from route parameters
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
updateContent(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  this.newPost.content = target.value;
}
publish()
{
  // // Set userId in newPost to the userId of the logged-in user
   if (this.loggedInUserId) {
     this.newPost.userId = this.loggedInUserId;
   }
   console.log(this.newPost);
  this._PostsServiceService.addPost(this.newPost).subscribe({
    next: (res) => {
      // Handle the response properly, maybe add the new post to the items array
      this.items.unshift(res); // Add the new post to the beginning of the array
      // // Reset newPost for a new post
      // this.newPost = { userId: '', content: '', postImage: '', postTime: '' };
    },
    error: (err) => {
      console.log(err);
    }
  });
}
}
