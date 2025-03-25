import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserTokenDto} from '../models/user-token-dto';
import {RegisterFormModel} from '../models/register-form.model';
import {LoginFormModel} from '../models/login-form.model';
import {tap} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _http: HttpClient = inject(HttpClient);

  // private readonly _currentUser$: BehaviorSubject<UserTokenDto|undefined>;
  currentUser: WritableSignal<UserTokenDto|undefined>;

  constructor() {

    let jsonUser = localStorage.getItem('currentUser');
    this.currentUser = signal(jsonUser ? JSON.parse(jsonUser) : undefined);

    // this._currentUser$ = new BehaviorSubject<UserTokenDto|undefined>(undefined);
    // if(jsonUser) {
    //   this._currentUser$.next(JSON.parse(jsonUser));
    // }
  }

  // get currentUser() {
  //   return this._currentUser$?.value;
  // }
  //
  // get currentUser$() {
  //   return this._currentUser$?.asObservable();
  // }

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
    // this._currentUser$?.next(undefined);
  }
}
