import {Component, effect, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ButtonDirective} from 'primeng/button';
import {NgIf} from '@angular/common';
import {AuthService} from '../../../auth/services/auth-service';
import {MessageService} from 'primeng/api';
import {Toast} from 'primeng/toast';
import {Dialog} from 'primeng/dialog';

@Component({
  selector: 'app-home',
  imports: [
    Toast,
    Dialog,
    ButtonDirective,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [MessageService]
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
