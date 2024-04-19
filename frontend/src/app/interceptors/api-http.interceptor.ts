import { HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { TokenService } from '../services/token.service';
import { LoginResponse } from '../services/auth.service';
import { environment } from '../../environments/environment';

export const apiHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  
  return next(tokenService.setTokenOnRequest(req)).pipe(
    tap((res: HttpEvent<unknown>) => {
      if(req.url === environment.apiURL + '/login') {
        if(res instanceof HttpResponse) {
          tokenService.setToken((res.body as LoginResponse).token);
          console.log('Token set')
        }
      }
    })
  );
};
