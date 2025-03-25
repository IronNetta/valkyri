import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth-service';
import {samePasswordValidator} from '../../validators/same-password.validators';
import {FloatLabel} from 'primeng/floatlabel';
import {Password} from 'primeng/password';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'app-register',
  imports: [
    FloatLabel,
    ReactiveFormsModule,
    Password,
    Button,
    InputText
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _authService: AuthService = inject(AuthService);

  @Output()
  private readonly close: EventEmitter<void> = new EventEmitter();

  registerForm: FormGroup;

  constructor() {
    this.registerForm = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      birthDate: [null]
    });
    this.registerForm.setValidators(samePasswordValidator());
  }

  submit() {

    this.registerForm.markAllAsTouched();

    if (this.registerForm.invalid) {
      return;
    }

    this._authService.register(this.registerForm.value).subscribe({
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
