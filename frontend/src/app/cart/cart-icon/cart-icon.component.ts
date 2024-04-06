import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Select } from '@ngxs/store';
import { TuiButtonModule, TuiDialogContext, TuiDialogService, TuiDialogModule } from '@taiga-ui/core';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import { LivlCartState } from '../cart.state';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CartPopupComponent } from '../cart-popup/cart-popup.component';

@Component({
  selector: 'cart-icon',
  standalone: true,
  imports: [
    CommonModule,
    TuiButtonModule,
    TuiDialogModule,
    CartPopupComponent
  ],
  templateUrl: './cart-icon.component.html',
  styleUrl: './cart-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartIconComponent {
  
  @Select(LivlCartState.getItemsCount)
  declare quantity: Observable<number>;
  
  constructor(@Inject(TuiDialogService) private readonly dialogs: TuiDialogService) { }

  openCart(content: PolymorpheusContent<TuiDialogContext>) {
    this.dialogs.open(content).subscribe();
  }



}
