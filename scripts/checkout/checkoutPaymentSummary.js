import { cart } from "../../data/cart.js";
console.log(cart);
let updateCartQuantity = 0;

cart.forEach((cartItem) => {
  updateCartQuantity += cartItem.quantity;
});
export function renderPaymentSummary(updateCartQuantity) {
  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row"> <div>Items (${updateCartQuantity}):</div>
      <div class="payment-summary-money">
     $${itemPrice()}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
      $0.00
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
    $${itemPrice()}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
      $${calTax()}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
     $ ${itemTotalPrice()}
      </div>
    </div>

    <button class="place-order-button button-primary" ${
      cart.length === 0 && `disabled`
    } >
      Place your order
    </button>
  `;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
}
renderPaymentSummary(updateCartQuantity);
// document.querySelector(".total-checkout-items").innerHTML = cartTotalQty;

function itemPrice() {
  let total = 0;
  cart.forEach((el) => {
    total += (el.priceCents / 100).toFixed(2) * el.quantity;
  });

  return Number(total.toFixed(2));
}
function calTax() {
  let tax = (itemPrice() * 0.1).toFixed(2);
  return Number(tax);
}
console.log();

function itemTotalPrice() {
  let totalP = calTax() + itemPrice();
  return totalP.toFixed(2);
}

// Enable the button
// button.disabled = false;
