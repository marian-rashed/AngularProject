import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogInComponent } from '../assets/components/logIn/log-in.component';
import {NavbarComponent} from '../assets/components/navbar/navbar.component'
import {SidebarComponent} from '../assets/components/sidebar/sidebar.component'


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LogInComponent,NavbarComponent,SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularProject';
}
