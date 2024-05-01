// src/Services/auth.service.ts

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Redirect to login page if not authenticated
    if (!this.checkIfUserIsAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  public checkIfUserIsAuthenticated(): boolean {
    
    // Implement your authentication logic here (e.g., check if user is logged in)
    // For demonstration purposes, let's assume user is authenticated if token exists in local storage
    //const token = localStorage.getItem('token');
    //return !!token; // Convert token to boolean
    return true;
  }
}
