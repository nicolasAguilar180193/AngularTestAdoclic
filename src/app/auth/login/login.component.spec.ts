import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from 'src/app/services/user.service';
import { throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should have a form with email and password', () => {
    expect(component.form.contains('email')).toBe(true);
    expect(component.form.contains('password')).toBe(true);
  });

  it('email should be required', () => {
    const control = component.form.get('email');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should have valid email', () => {
    const control = component.form.get('email');
    control?.setValue('testexample.com');
    expect(control?.valid).toBeFalsy();

    control?.setValue('test@example.com');
    expect(control?.valid).toBeTruthy();
  });

  it('password should be required', () => {
    const control = component.form.get('password');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();

    control?.setValue('password123');
    expect(control?.valid).toBeTruthy();
  });

  it('password should have 6 characters or more', () => {
    const control = component.form.get('password');
    control?.setValue('12345');
    expect(control?.valid).toBeFalsy();

    control?.setValue('123456');
    expect(control?.valid).toBeTruthy();
  });

  it('should set sending to true and message to empty string on form submission', () => {
    component.onSubmit();
    expect(component.sending).toBeTrue();
    expect(component.message).toBe('');
  });

  it('should set message to "Invalid email or password" on login error', () => {
    spyOn(userService, 'login').and.returnValue(throwError({ error: 'Invalid email or password' }));
    component.onSubmit();
    expect(component.message).toBe('Invalid email or password');
  });

  it('should call userService login when onSubmit is called', () => {
    spyOn(userService, 'login').and.callThrough();
  
    component.onSubmit();
  
    expect(userService.login).toHaveBeenCalled();
  });
});
