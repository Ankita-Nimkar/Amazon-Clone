import { orders } from "../data/orders.js";
const url = new URL(window.location.href);

const orderId = url.searchParams.get("orderId");
const productId = url.searchParams.get("productId");
console.log(orderId);
console.log(productId);
console.log(orders);
function renderTrackProdHtml(prod) {
  const trackProdHtml = ` <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="ordersReturns.html">
          View all orders
        </a>

        <div class="delivery-date">Arriving on ${prod.deliveryDate}</div>

        <div class="product-info">
         ${prod.name}
        </div>

        <div class="product-info">Quantity: ${prod.quantity}</div>

        <img
          class="product-image"
          src="${prod.image}"
        />

        <div class="progress-labels-container">
          <div class="progress-label">Preparing</div>
          <div class="progress-label current-status">Shipped</div>
          <div class="progress-label">Delivered</div>
        </div>

        <div class="progress-bar-container progress-bar-container-${prod.id}" >
        
        </div>
      </div>`;

  return (document.querySelector(".main").innerHTML = trackProdHtml);
}
const trackedProduct = orders.forEach((order) => {
  if (order.id === orderId) {
    order.cart.forEach((prod) => {
      if (prod.id === productId) {
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

        const parts = order.date.split(" ");

        const formattedDateTracking = `${month[Number(parts[0]) - 1]} ${
          parts[1]
        }`;

        console.log(formattedDateTracking);
        console.log(prod.deliveryDate);

        const date1String = formattedDateTracking;
        const date2String = prod.deliveryDate;

        const year = new Date().getFullYear(); // Use current year as a default

        const date1 = new Date(`${date1String}, ${year}`);
        const date2 = new Date(`${date2String}, ${year}`);

        const msPerDay = 1000 * 60 * 60 * 24; // Milliseconds in a day

        const utcDate1 = Date.UTC(
          date1.getFullYear(),
          date1.getMonth(),
          date1.getDate()
        );
        const utcDate2 = Date.UTC(
          date2.getFullYear(),
          date2.getMonth(),
          date2.getDate()
        );

        const timeDifference = Math.abs(utcDate2 - utcDate1);
        const daysDifference = Math.round(timeDifference / msPerDay);

        let calcP = ((10 - daysDifference) / 14) * 100;

        renderTrackProdHtml(prod);
        console.log(`dayDiff:${daysDifference}, calcP:${calcP}`);
        document.querySelector(
          `.progress-bar-container-${productId}`
        ).innerHTML = `  <div class="progress-bar" style="width:${calcP}%"></div>`;
      }
    });
  }
});
