import { cart } from "../../data/cart.js";
import { renderPaymentSummary } from "./checkoutPaymentSummary.js";
console.log(updateQuantity());
console.log();

updateCartQuantity();
let cartSummaryHTML = "";
function renderCartSummaryHtml() {
  cart.forEach((el) => {
    cartSummaryHTML += `
    <div class="cart-item-container
      js-cart-item-container-${el.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${el.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${el.name}
          </div>
         
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label quantity-label-${el.id}">${el.quantity}</span><span><input type="number" class="new-quantity-input  new-quantity-input-${el.id} hidden" value="${el.quantity}"></span>
            </span>
            <span class="update-quantity-link update-${el.id} link-primary" data-product-id="${el.id}" >
              Update
            </span>
               <span class="save-quantity-link save-${el.id} link-primary hidden" data-product-id="${el.id}" >
              Save
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${el.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${el.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${el.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${el.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  });
  document.querySelector(".total-checkout-items").innerHTML = 1;

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;
}
renderCartSummaryHtml();

function updateBtn() {
  document.querySelectorAll(".update-quantity-link").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const targetId = e.target.dataset.productId;

      cart.forEach((item) => {
        if (item.id === targetId) {
          document
            .querySelector(`.new-quantity-input-${targetId}`)
            .classList.remove("hidden");
          document
            .querySelector(`.quantity-label-${targetId}`)
            .classList.add("hidden");
          document.querySelector(`.update-${targetId}`).classList.add("hidden");
          document
            .querySelector(`.save-${targetId}`)
            .classList.remove("hidden");
        }
      });
    });
  });
}

function saveBtn() {
  document.querySelectorAll(".save-quantity-link").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const targetId = e.target.dataset.productId;

      cart.forEach((item) => {
        if (item.id === targetId) {
          item.quantity = Number(
            document.querySelector(`.new-quantity-input-${targetId}`).value
          );
          document
            .querySelector(`.new-quantity-input-${targetId}`)
            .classList.add("hidden");
          document
            .querySelector(`.update-${targetId}`)
            .classList.remove("hidden");
          document;
          document.querySelector(`.save-${targetId}`).classList.add("hidden");
        }
      });
      cartSummaryHTML = "";

      document.querySelector(".js-order-summary").innerHTML = "";

      renderCartSummaryHtml();
      updateBtn();
      console.log(cart);
      saveBtn();
      addToLocalStorage(cart);
    });
  });
  renderPaymentSummary(updateQuantity());
  updateCartQuantity();
  updateBtn();
  deleteBtn();
}

function deleteBtn() {
  document.querySelectorAll(".delete-quantity-link").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const targetDeleteId = e.target.dataset.productId;

      cart.forEach((item) => {
        if (item.id === targetDeleteId) {
          cart.splice(
            cart.findIndex((a) => a.id === targetDeleteId),
            1
          );
        }
      });
      console.log(cart);
      cartSummaryHTML = "";

      document.querySelector(".js-order-summary").innerHTML = "";

      renderCartSummaryHtml();

      addToLocalStorage(cart);
      updateBtn();
      saveBtn();
      deleteBtn();
    });
  });
  updateCartQuantity();
}

saveBtn();
updateBtn();
deleteBtn();
export function updateCartQuantity() {
  ////////////////show cart quantity
  document.querySelector(".total-checkout-items").innerHTML = updateQuantity();
}
function updateQuantity() {
  let updateCartQuantity = 0;

  cart.forEach((cartItem) => {
    updateCartQuantity += cartItem.quantity;
  });
  return updateCartQuantity;
}
console.log(updateQuantity());
function addToLocalStorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
