import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  users = [
    { imageUrl: '../../assets/Images/hagar.jpg', name: 'John Doe', email: 'john@example.com' },
    { imageUrl: '../../assets/Images/hagar.jpg', name: 'Jane Smith', email: 'jane@example.com' },
    { imageUrl: '../../assets/Images/hagar.jpg', name: 'John Doe', email: 'john@example.com' },
    { imageUrl: '../../assets/Images/hagar.jpg', name: 'Jane Smith', email: 'jane@example.com' },
    { imageUrl: '../../assets/Images/hagar.jpg', name: 'John Doe', email: 'john@example.com' },
    { imageUrl: '../../assets/Images/hagar.jpg', name: 'Jane Smith', email: 'jane@example.com' },
  ];
}
