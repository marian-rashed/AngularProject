
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { ChatComponent } from '../components/chat/chat.component';
import { NotificationComponent } from '../components/notification/notification.component';

export  const routes: Routes = [
    {path:"home" , component:HomeComponent},
    {path:"profile" , component:ProfileComponent},
    {path:"chat" , component:ChatComponent},
    {path:"notification" , component:NotificationComponent},
];
