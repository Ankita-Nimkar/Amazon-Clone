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
      
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
      
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
  
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
      
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
     
      </div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
}
renderPaymentSummary(updateCartQuantity);
// document.querySelector(".total-checkout-items").innerHTML = cartTotalQty;
