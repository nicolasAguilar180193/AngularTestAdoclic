import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginForm } from '../interfaces/login-form.interface';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = environment.baseUrl + 'auth';

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  saveLocalStorage( token: string) {
    localStorage.setItem('token', token );
  }

  login(formData: LoginForm) {

    return this.http.post(`${ this.baseUrl }/login`, {
      username: formData.email,
      password: formData.password    
    }).pipe(
        tap( (resp: any) => {
          this.saveLocalStorage( resp.token );
        })
      );
  }
}
