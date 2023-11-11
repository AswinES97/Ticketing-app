import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin, ISignup } from '../schemas/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  login(data: ILogin) {
    return this._http.post('http://localhost:3000/api/v1/auth/user/login', data)
  }

  signup(data: ISignup){
    return this._http.post('http://localhost:3000/api/v1/auth/user/signup/email',data)
  }
}
