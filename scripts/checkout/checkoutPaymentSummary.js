import { cart } from "../../data/cart.js";
import { addOrders } from "../../data/orders.js";
import { itemPrice, calTax, itemTotalPrice } from "../utils/totalMoney.js";

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
    }  >
      Place your order
    </button>
  `;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
  document
    .querySelector(".place-order-button")
    .addEventListener("click", (e) => {
      console.log(e);
      console.log(cart);
      const isValidated = cart.every((el) => el.deliveryDate);
      console.log(isValidated);
      if (!isValidated) {
        alert("Select Delivery Date");
      } else {
        window.location.href = "ordersReturns.html";
        addOrders({
          id: crypto.randomUUID(),
          cart: cart,
          total: itemTotalPrice(),
          date: `${new Date().getMonth() + 1} ${new Date().getDate()}`,
        });
      }

      localStorage.removeItem("cart");
    });
}
renderPaymentSummary(updateCartQuantity);
