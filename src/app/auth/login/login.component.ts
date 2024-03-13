import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string = '';
  sending: boolean = false;
  map = new Map();
  public form!: FormGroup;

  constructor(
    private _userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.map.set('user@demo.com', 'mor_2314');
    this.map.set('123456', '83r5^_');
  }

  onSubmit( ) {
    this.sending = true;
    this.message = '';
    const email = this.map.get(this.form.value.email) || '';
    const password = this.map.get(this.form.value.password) || '';

    this._userService.login({ email, password })
      .subscribe( {
        next: (resp) => {
          this.sending = false;
          this.router.navigate(['/shopping']);
        },
        error: (err) => {
          this.message = 'Invalid email or password';
          this.sending = false;
        }
    });
  }
}
