

import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { ChatComponent } from '../components/chat/chat.component';
import { NotificationComponent } from '../components/notification/notification.component';
import { NotfoundComponent } from '../components/notfound/notfound.component';
import { LogInComponent } from '../components/logIn/log-in.component';
import { RegisterComponent } from '../components/register/register.component';
import { LayoutComponent } from '../components/layout/layout.component';
import { AuthService } from '../Services/auth.service';

export  const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LogInComponent },
    { path: 'register', component: RegisterComponent },
    {
      path: '',
      component: LayoutComponent,
      canActivate: [AuthService],
      children: [
        { path: 'home', component: HomeComponent },
        { path: 'profile', component: ProfileComponent },
        { path: 'chat', component: ChatComponent },
        { path: 'notifications', component: NotificationComponent }
      ]
    },
    { path:"**",component:NotfoundComponent},
  ];
