import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TUI_SANITIZER, TuiDialogModule } from "@taiga-ui/core";
import { ListComponent } from "./list/list.component";
import { Component } from '@angular/core';
import { CartIconComponent } from "./cart/cart-icon/cart-icon.component";
import { LoginPopupComponent } from "./login-popup/login-popup.component";
import { RegisterPopupComponent } from "./register-popup/register-popup.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TuiRootModule,
    ListComponent,
    CartIconComponent,
    LoginPopupComponent,
    RegisterPopupComponent,
    TuiDialogModule
  ], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [{
    provide: TUI_SANITIZER, 
    useClass: NgDompurifySanitizer
  }]
})
export class AppComponent {
  title = 'TP5';
}
