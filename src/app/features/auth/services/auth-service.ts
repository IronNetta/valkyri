import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {UserTokenDto} from '../models/user-token-dto';
import {RegisterFormModel} from '../models/register-form.model';
import {LoginFormModel} from '../models/login-form.model';
import {tap} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _http: HttpClient = inject(HttpClient);

  private readonly _router: Router = inject(Router);

  currentUser: WritableSignal<UserTokenDto|undefined>;


  constructor() {

    let jsonUser = localStorage.getItem('currentUser');
    this.currentUser = signal(jsonUser ? JSON.parse(jsonUser) : undefined);

  }

  register(form: RegisterFormModel) {
    return this._http.post<void>(`${environment.API_URL}/register`,form);
  }

  login(form: LoginFormModel) {
    return this._http.post<UserTokenDto>(`${environment.API_URL}/login`,form).pipe(
      tap(result => {
        // this._currentUser$?.next(result);
        this.currentUser.set(result);
        localStorage.setItem("currentUser", JSON.stringify(result));
      }),
    );
  }

  logout() {
    localStorage.removeItem("currentUser");
    this.currentUser.set(undefined);
    this._router.navigate(['/home']);
  }

  catchError(err: HttpErrorResponse) {
    let erroMessage = "Une erreur est survenue.";
    if(err instanceof HttpErrorResponse) {
      switch (err.status) {
        case 400:
          "Une erreur est survenue.";
          break;
        case 500:
          "Cette email existe déjà";
          break;
        default:
          break;

      }
    }
  }

}
