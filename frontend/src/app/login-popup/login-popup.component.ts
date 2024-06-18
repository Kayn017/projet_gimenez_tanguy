import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButtonModule, TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'login-popup',
  standalone: true,
  imports: [
    TuiButtonModule,
    TuiInputModule,
    TuiInputPasswordModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login-popup.component.html',
  styleUrl: './login-popup.component.scss'
})
export class LoginPopupComponent {  
  readonly loginForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    private authService: AuthService,
    private tokenService: TokenService
  ) { }

  openLoginPopup(content: PolymorpheusContent<TuiDialogContext>) {
    this.dialogService.open(content).subscribe();
  }

  login() {
    if(!this.loginForm.value.login) {
      throw new Error('Login is required')
    }

    if(!this.loginForm.value.password) {
      throw new Error('Password is required')
    }
    
    this.authService.login(this.loginForm.value.login, this.loginForm.value.password).subscribe();
  }

  get loggedIn(): boolean {
    return this.tokenService.isLoggedIn();
  }

  logout() {
    this.tokenService.setToken(null);
  }
}
