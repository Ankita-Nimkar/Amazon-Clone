export let orders = JSON.parse(localStorage.getItem("orders")) || [];
export function addOrders(order) {
  orders.unshift(order);
  addToLocalStorage(orders);
}
function addToLocalStorage(orders) {
  localStorage.setItem("orders", JSON.stringify(orders));
}
