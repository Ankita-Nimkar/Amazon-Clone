import { products } from "../data/products.js";
export let cart = JSON.parse(localStorage.getItem("cart")) || [];

//////////////////////Add to Cart/////////////////////////////////////////////
export function addToCart(targetId) {
  products.forEach((product) => {
    if (product.id === targetId) {
      ///Add to cart
      //avoide duplicate in cart
      ////////////////////////////////////////

      let productExist = cart.some((prod) => prod.id === targetId);

      //drop down input
      const inputElement = document.querySelector(
        `.quantity-select-${product.id}`
      );
      if (!productExist) {
        let newProduct = { ...product, quantity: Number(inputElement.value) };
        cart.push(newProduct);
      } else {
        cart.forEach((prod) => {
          if (prod.id === targetId) {
            if (Number(inputElement.value) > 1) {
              prod.quantity += Number(inputElement.value);
            } else {
              prod.quantity += 1;
            }
          }
        });
      }

      addToLocalStorage(cart);
      // // /////Added to cart msg
      const element = document.querySelector(`.added-msg-${product.id}`);
      if (element) {
        element.classList.remove("addTransition");
        element.innerHTML = "Added";

        setTimeout(() => {
          element.classList.add("addTransition");
        }, "2000");
      }
    }
  });
  console.log(cart);

  function addToLocalStorage(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}
