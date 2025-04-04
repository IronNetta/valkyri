import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../../environments/environment";
import {UserDtoModel} from "../models/user-dto.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly _http: HttpClient = inject(HttpClient);

  constructor() {
  }

    getAllUsers(){
      return this._http.get<UserDtoModel[]>(`${environment.API_URL}/user`);
  }
}
