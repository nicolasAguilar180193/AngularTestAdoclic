import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { UserService } from './user.service';
import { LoginForm } from '../interfaces/login-form.interface';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should send the login request with valid form data', () => {
    const formData: LoginForm = { email: 'test@example.com', password: 'password123' };
    service.login(formData).subscribe();
    const req = httpMock.expectOne(`${service.baseUrl}/login`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ username: formData.email, password: formData.password });
    req.flush({ token: 'mockToken' });
  });

  it('should save the token to local storage on successful login', () => {
      const mockToken = 'token_test';
      localStorage.removeItem('token');
      const formData: LoginForm = {
        email: "test@example.com",
        password: "password123"
      }
      service.login(formData).subscribe();
      const mockReq = httpMock.expectOne(`${service.baseUrl}/login`);
      mockReq.flush({token : mockToken});
      expect(localStorage.getItem('token')).toEqual(mockToken);
    });
  
});
