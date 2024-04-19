import { provideAnimations } from "@angular/platform-browser/animations";
import { TuiRootModule } from "@taiga-ui/core";
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from "@angular/common/http";
import { routes } from './app.routes';
import { NgxsModule } from "@ngxs/store";
import { LivlCartState } from "./cart/cart.state";
import { apiHttpInterceptor } from "./interceptors/api-http.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(), 
    provideRouter(routes), 
    importProvidersFrom(TuiRootModule), 
    provideHttpClient(withInterceptors([apiHttpInterceptor])),
    importProvidersFrom(NgxsModule.forRoot([LivlCartState]))]
};
