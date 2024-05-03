import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsServiceService } from '../../Services/posts-service.service';
import { Post } from '../../Interfaces/post';


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

  constructor(private _PostsServiceService: PostsServiceService) {
  }
  ngOnInit(): void {
    this._PostsServiceService.GetAllPosts().subscribe({
      next: (res) => {this.items=res},
      error:(err)=>{console.log(err)}
    })

  }
}
