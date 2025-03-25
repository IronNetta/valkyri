import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth-service';
import {FloatLabel} from 'primeng/floatlabel';
import {Password} from 'primeng/password';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    Password,
    Button,
    InputText
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _authService: AuthService = inject(AuthService);

  @Output()
  private readonly close: EventEmitter<void> = new EventEmitter();

  loginForm: FormGroup;

  constructor() {
    this.loginForm = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  submit() {

    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      return;
    }

    this._authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.closeForm();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  closeForm() {
    this.close.emit();
  }
}
