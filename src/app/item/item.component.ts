import { Component } from '@angular/core';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiIslandModule } from '@taiga-ui/kit';
import { Store } from '@ngxs/store';
import { AddToCart } from '../cart/cart.actions';
import { CommonModule } from '@angular/common';
import { LivlItem } from '../services/livl.service';

@Component({
  selector: 'item',
  standalone: true,
  imports: [
    CommonModule,
    TuiIslandModule,
    TuiButtonModule
  ],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
  inputs: ['data']
})
export class ItemComponent {
  public declare data: LivlItem;

  constructor(private store: Store) {}

  addToCart() {
    this.store.dispatch(new AddToCart(this.data));
  }
}
