import { cart } from "../../data/cart.js";

export function itemPrice() {
  let total = 0;
  cart.forEach((el) => {
    total += (el.priceCents / 100).toFixed(2) * el.quantity;
  });

  return Number(total.toFixed(2));
}

export function calTax() {
  let tax = (itemPrice() * 0.1).toFixed(2);
  return Number(tax);
}

export function itemTotalPrice() {
  let totalP = calTax() + itemPrice();
  return totalP.toFixed(2);
}
