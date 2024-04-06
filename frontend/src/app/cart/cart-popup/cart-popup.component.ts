import { Component } from '@angular/core';
import { LivlCartItem, LivlCartState } from '../cart.state';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiButtonModule } from '@taiga-ui/core';
import { RemoveFromCart } from '../cart.actions';
import { LivlItem } from '../../services/livl.service';

@Component({
  selector: 'cart-popup',
  standalone: true,
  imports: [
    CommonModule,
    TuiTableModule,
    TuiButtonModule
  ],
  templateUrl: './cart-popup.component.html',
  styleUrl: './cart-popup.component.scss'
})
export class CartPopupComponent {
  @Select(LivlCartState.getItems)
  declare items: Observable<LivlCartItem[]>;

  @Select(LivlCartState.getItemsCount)
  declare quantity: Observable<number>;

  @Select(LivlCartState.getTotalPrice)
  declare totalPrice: Observable<number>;

  constructor(private store: Store) {}

  public get displayedColumns(): readonly string[] {
    return ['name', 'price', 'quantity', 'total', 'supprimer'];
  }

  public removeItem(item: LivlItem) {
    this.store.dispatch(new RemoveFromCart(item));
  }
}
