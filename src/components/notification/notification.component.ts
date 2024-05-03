import { Component, OnInit } from '@angular/core';
import { PostsServiceService } from '../../Services/posts-service.service';
import { CommonModule } from '@angular/common';
import { Post } from '../../Interfaces/post';


@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {

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

