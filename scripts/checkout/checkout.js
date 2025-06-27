import { cart } from "../../data/cart.js";
import { renderPaymentSummary } from "./checkoutPaymentSummary.js";
// console.log(updateQuantity());
console.log(cart);
updateCartQuantity();

function renderCartSummaryHtml() {
  let cartSummaryHTML = "";
  cart.forEach((el) => {
    cartSummaryHTML += `
    <div class="cart-item-container
      js-cart-item-container-${el.id}">
      <div class="delivery-date">
        Delivery date: 
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${el.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${el.name}
          </div>
         <div class="product-price">
               $${(el.priceCents / 100).toFixed(2)}
              </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label quantity-label-${el.id}">${
      el.quantity
    }</span><span><input type="number" class="new-quantity-input  new-quantity-input-${
      el.id
    } hidden" value="${el.quantity}"></span>
            </span>
            <span class="update-quantity-link update-${
              el.id
            } link-primary" data-product-id="${el.id}" >
              Update
            </span>
               <span class="save-quantity-link save-${
                 el.id
               } link-primary hidden" data-product-id="${el.id}" >
              Save
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
              el.id
            }">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery date:
          </div>
          <div class="delivery-option">
           <div style= text-align:center>
           <input type="date"   min="" class="datepicker" name="delivery-option" data-date-id="${
             el.id
           }" required>
   
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
function renderEmptyCartHtml() {
  let emptyCartHtml = "";
  emptyCartHtml = `
  <div data-testid="empty-cart-message">
        Your cart is empty.
      </div>
  <a class="button-primary view-products-link" href="." data-testid="view-products-link">
        View products
      </a>`;
  document.querySelector(".js-order-summary").innerHTML = emptyCartHtml;
}
if (cart.length !== 0) {
  renderCartSummaryHtml();
} else {
  renderEmptyCartHtml();
}

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
        if (item.quantity < 1) {
          alert("This is ont invalid number.");
        }
      });

      document.querySelector(".js-order-summary").innerHTML = "";

      if (cart.length !== 0) {
        renderCartSummaryHtml();
      } else {
        renderEmptyCartHtml();
      }

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
      if (cart.length !== 0) {
        renderCartSummaryHtml();
      } else {
        renderEmptyCartHtml();
      }
      updateBtn();
      saveBtn();
      deleteBtn();

      addToLocalStorage(cart);
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

// //////////////////delivery date
document.querySelectorAll(".datepicker").forEach((el) => {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  el.required = true;
  el.addEventListener("change", function (event) {
    let dateId = event.target.dataset.dateId;
    const selectedDate = event.target.value; // Get the selected date value

    cart.forEach((item) => {
      if (item.id === dateId) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        //////////min date
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1); // Add one day to get tomorrow
        tomorrow.setHours(0, 0, 0, 0);

        const maxDays = new Date(today);
        maxDays.setDate(today.getDate() + 15);
        maxDays.setHours(0, 0, 0, 0);

        console.log(selectedDate);
        const inputDate = new Date(selectedDate);
        inputDate.setHours(0, 0, 0, 0);

        const parts = selectedDate.split("-");
        console.log(inputDate);
        console.log(tomorrow);
        console.log(maxDays);
        const formattedDate = `${month[Number(parts[1]) - 1]} ${parts[2]}`;
        if (inputDate < tomorrow) {
          // 4. Trigger the alert
          alert("The selected date is before tomorrow!");
        } else if (inputDate > maxDays) {
          alert("select date before 15 days");
        } else {
          item.deliveryDate = formattedDate;
          document.querySelector(
            `.js-cart-item-container-${dateId}> .delivery-date`
          ).innerHTML = ` Delivery date: ${formattedDate}`;
        }
      }
    });
  });
});
function addToLocalStorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
