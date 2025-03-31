import {Component, effect, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ButtonDirective} from 'primeng/button';
import {NgIf} from '@angular/common';
import {AuthService} from '../../../auth/services/auth-service';

@Component({
  selector: 'app-home',
  imports: [
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isLoggedIn: boolean = false;
  userName: string = '';

  constructor(private authService: AuthService) {
    effect(() => {
      const currentUser = this.authService.currentUser();
      this.isLoggedIn = !!currentUser;
      this.userName = currentUser?.user.fullName || '';
    });
  }
}
