import { Action, Selector, State, StateContext } from "@ngxs/store";
import { LivlItem } from "../services/livl.service";
import { AddToCart, RemoveFromCart } from "./cart.actions";
import { Injectable } from "@angular/core";

export interface LivlCartItem {
    item: LivlItem;
    quantity: number;
}

export interface LivlCart {
    items: LivlCartItem[];
}

@State<LivlCart>({
    name: 'cart',
    defaults: {
        items: []
    }
})
@Injectable()
export class LivlCartState {
    @Selector()
    static getItems(state: LivlCart) {
        return state.items;
    }

    @Selector()
    static getItemsCount(state: LivlCart) {
        return state.items.reduce<number>((acc, cartItem) => acc + cartItem.quantity, 0);
    }

    @Selector()
    static getTotalPrice(state: LivlCart) {
        return state.items.reduce((acc, cartItem) => acc + cartItem.item.price * cartItem.quantity, 0);
    }

    @Action(AddToCart)
    addToCart(context: StateContext<LivlCart>, { payload }: AddToCart) {
        const state = context.getState();
        const item = state.items.find(cartItem => cartItem.item.id === payload.id);

        if (item) {
            context.patchState({
                items: state.items.map(cartItem => cartItem.item.id === payload.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
            });
        } else {
            context.patchState({
                items: [...state.items, { item: payload, quantity: 1 }]
            });
        }
    }

    @Action(RemoveFromCart)
    removeFromCart(context: StateContext<LivlCart>, { payload }: RemoveFromCart) {
        const state = context.getState();
        const item = state.items.find(cartItem => cartItem.item.id === payload.id);

        if (item) {
            if (item.quantity > 1) {
                context.patchState({
                    items: state.items.map(cartItem => cartItem.item.id === payload.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)
                });
            } else {
                context.patchState({
                    items: state.items.filter(cartItem => cartItem.item.id !== payload.id)
                });
            }
        }
    }
}