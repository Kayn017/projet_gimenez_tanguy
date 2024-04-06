import { LivlItem } from "../services/livl.service";

export class AddToCart {
    static type = '[Cart] Add to Cart';
    constructor(public payload: LivlItem) {}
}

export class RemoveFromCart {
    static type = '[Cart] Remove from Cart';
    constructor(public payload: LivlItem) {}
}