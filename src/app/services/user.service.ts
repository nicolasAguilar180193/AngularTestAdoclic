import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginForm } from '../interfaces/login-form.interface';
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = environment.baseUrl + 'auth';
  private isAuthenticated: boolean = false;

  constructor(private http: HttpClient) { 
    this.isAuthenticated = !!localStorage.getItem('token');
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  saveLocalStorage( token: string) {
    localStorage.setItem('token', token );
  }

  login(formData: LoginForm): Observable<any> {
    return this.http.post(`${ this.baseUrl }/login`, {
      username: formData.email,
      password: formData.password    
    }).pipe(
        tap( (resp: any) => {
          this.saveLocalStorage( resp.token );
          this.isAuthenticated = true;
        })
      );
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
  }
}
