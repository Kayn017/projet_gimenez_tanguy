import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButtonModule, TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { AuthService } from '../services/auth.service';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'register-popup',
  standalone: true,
  imports: [
    TuiButtonModule,
    TuiInputModule,
    TuiInputPasswordModule,
    ReactiveFormsModule
  ],
  templateUrl: './register-popup.component.html',
  styleUrl: './register-popup.component.scss'
})
export class RegisterPopupComponent {
  readonly registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    private authService: AuthService,
    private tokenService: TokenService
  ) { }

  openRegisterPopup(content: PolymorpheusContent<TuiDialogContext>) {
    this.dialogService.open(content).subscribe();
  }

  register() {
    if(!this.registerForm.value.username) {
      throw new Error('Login is required')
    }

    if(!this.registerForm.value.password) {
      throw new Error('Password is required')
    }

    if(this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      throw new Error('Passwords do not match')
    }
    
    this.authService.register(this.registerForm.value.username, this.registerForm.value.password).subscribe();
  } 

  get isLoggedIn(): boolean {
    return this.tokenService.isLoggedIn();
  }
}
