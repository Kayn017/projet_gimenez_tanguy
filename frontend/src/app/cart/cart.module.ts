import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { LivlCartState } from './cart.state';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsModule.forFeature([LivlCartState])
  ]
})
export class CartModule { }
