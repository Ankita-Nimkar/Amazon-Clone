import { orders } from "../data/orders.js";
import { products } from "../data/products.js";
import { itemPrice } from "./utils/totalMoney.js";
import { addToCart, cart } from "../data/cart.js";
import { updateCartQuantity } from "./header.js";
import { searchBtn } from "./amazon.js";
// console.log(itemTotalPrice(), calTax(), itemPrice());

console.log(orders);
function renderProductDetailHtml(prod, orderId) {
  let productDetailHtml = `
  <div class="product-image-container">
              <img src="${prod.image}">
            </div>
   <div class="product-details">
              <div class="product-name">
                ${prod.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${prod.deliveryDate}
              </div>
              <div class="product-quantity">
                Quantity: ${prod.quantity}
              </div>
              <button class="buy-again-button button-primary" >
              
                <img class="buy-again-icon" src="images/buy-again.png"         data-product-order-id="${prod.id}">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>
              <div class="product-actions">
              <a href="tracking.html?orderId=${orderId}&productId=${prod.id}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
            
  `;
  return productDetailHtml;
}
function renderOrderContainerHtml() {
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
  let html = "";

  for (let i = 0; i < orders.length; i++) {
    html += `<div class="order-container">
            <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${month[new Date(orders[i].date).getMonth()]} ${new Date(
      orders[i].date
    ).getDate()}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
            <div>$${orders[i].total}</div>
              </div>
             </div>
             <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orders[i].id}</div>
            </div>
          </div>
          
            <div class="order-details-grid">
            `;

    for (let j = 0; j < orders[i].cart.length; j++) {
      html += renderProductDetailHtml(orders[i].cart[j], orders[i].id);
    }

    html += `  </div></div>`;
  }

  document.querySelector(".orders-grid").innerHTML = html;
}
renderOrderContainerHtml();

function buyAgainButtonBtn() {
  ////////add to cart btn ////////////////////////////////////////////////////////////

  const buyAgainButtonBtns = document.querySelectorAll(".buy-again-icon");
  buyAgainButtonBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      console.log(e.target.parentElement);
      console.log(e.target.dataset.productOrderId);
      const targetId = e.target.dataset.productOrderId;
      // e.target.parentElement.innerHTML = "";
      addToCart(targetId);
      console.log("cart:", cart);
      updateCartQuantity();
      e.target.parentElement.innerHTML = ` 
      <img src="./images/checkmark.png">
      <p class="added-${targetId}">Added</p>`;
    });
  });
}

buyAgainButtonBtn();
document.querySelector(".search-btn").addEventListener("click", () => {
  const searchBar = document.querySelector("#search-bar");

  if (searchBar.value) {
    document.querySelector(".page-title").classList.add("hidden");
    document.querySelector(".orders-grid").classList.add("hidden");
    document.querySelector(".product-container").classList.remove("hidden");
  }
});

searchBtn();
