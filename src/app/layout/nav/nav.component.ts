import {Component, effect, inject, WritableSignal} from '@angular/core';
import {UserTokenDto} from '../../features/auth/models/user-token-dto';
import {AuthService} from '../../features/auth/services/auth-service';
import {MenuItem} from 'primeng/api';
import {Menubar} from 'primeng/menubar';
import {Dialog} from 'primeng/dialog';
import {RegisterComponent} from '../../features/auth/components/register/register.component';
import {LoginComponent} from '../../features/auth/components/login/login.component';

@Component({
  selector: 'app-nav',
  imports: [
    Menubar,
    Dialog,
    RegisterComponent,
    LoginComponent
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

  private readonly _authService: AuthService = inject(AuthService);

  items!: MenuItem[];
  registerVisible: boolean = false;
  loginVisible: boolean = false;
  currentUser: WritableSignal<UserTokenDto|undefined>;

  constructor() {

    this.currentUser = this._authService.currentUser;
    effect(() => {
      this.initNav(this.currentUser());
    });
    // this._authService.currentUser$.subscribe({
    //   next: result => {
    //     this.currentUser = result;
    //     this.initNav();
    //   }
    // });
  }

  closeForm(): void {
    this.registerVisible = false;
    this.loginVisible = false;
  }

  initNav(currentUser: UserTokenDto | undefined) {
    if (currentUser) {
      this.items =
        [
          {
            label: 'Home',
            icon: 'pi pi-home',
            routerLink: '/home',
          },
          {
            label: currentUser.user.fullName,
            icon: 'pi pi-user',
          },
          {
            label: 'users',
            icon: 'pi pi-users',
            routerLink: '/users',
          },
          {
            label: 'Logout',
            icon: 'pi pi-logout',
            command: () => {
              this._authService.logout();
            }
          },
        ];
    } else {
      this.items = [
        {
          label: 'Home',
          icon: 'pi pi-home',
          routerLink: '/home',
        },
        {
          label: 'Register',
          icon: 'pi pi-user',
          command: () => {
            this.registerVisible = true;
          }
        },
        {
          label: 'Login',
          icon: 'pi pi-user',
          command: () => {
            this.loginVisible = true;
          }
        }
      ];
    }
  }
}
