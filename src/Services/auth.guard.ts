// src/Services/auth.guard.ts

import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service'; // Ensure this import path is correct
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = new AuthService(); // Instantiate the AuthService
  const router = new Router(); // Instantiate the Router

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
