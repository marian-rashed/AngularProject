import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogInComponent } from '../Components/log-in/log-in.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LogInComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularProject';
}
