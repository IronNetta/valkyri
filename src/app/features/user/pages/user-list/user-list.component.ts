import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {UserDtoModel} from '../../models/user-dto.model';
import {NgForOf} from '@angular/common';
import {UserService} from '../../services/user.service';
import {TableModule} from 'primeng/table';

@Component({
  selector: 'app-user-list',
  imports: [
    TableModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  private userService = inject(UserService);
  users = signal<any[]>([]);

  constructor() {
    effect(() => {
      this.userService.getAllUsers().subscribe(data => {
        this.users.set(data);
      });
    });
  }
}
