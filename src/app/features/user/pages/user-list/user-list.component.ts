import {Component, inject, OnInit} from '@angular/core';
import {UserDtoModel} from '../../models/user-dto.model';
import {NgForOf} from '@angular/common';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  imports: [
    NgForOf
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  private userService = inject(UserService);

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }
}
