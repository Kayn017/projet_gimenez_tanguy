import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Select } from '@ngxs/store';
import { TuiButtonModule, TuiDialogContext, TuiDialogService, TuiDialogModule } from '@taiga-ui/core';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import { LivlCartItem, LivlCartState } from '../cart.state';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cart-icon',
  standalone: true,
  imports: [
    CommonModule,
    TuiButtonModule,
    TuiDialogModule
  ],
  templateUrl: './cart-icon.component.html',
  styleUrl: './cart-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartIconComponent {

  @Select(LivlCartState.getItems)
  declare items: Observable<LivlCartItem[]>;

  @Select(LivlCartState.getItemsCount)
  declare quantity: Observable<number>;
  
  constructor(@Inject(TuiDialogService) private readonly dialogs: TuiDialogService) { }

  openCart(content: PolymorpheusContent<TuiDialogContext>) {
    this.dialogs.open(content).subscribe();
  }



}
