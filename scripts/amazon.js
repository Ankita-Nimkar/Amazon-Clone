import { addToCart } from "../data/cart.js";
import { products } from "../data/products.js";

import { updateCartQuantity } from "./header.js";

function renderHtml(prod) {
  let prodHtml = "";
  prodHtml += `
  <div class="product">
  <div class="product-image" >
  <img src="${prod.image}">
  </div>
  <div class="prod-discription">
  <p>${prod.name}</p>
  <div class="rating">

  <img class="rating-image" src="./images/ratings/rating-${
    prod.rating.stars * 10
  }.png">
  
  ${prod.rating.count}
  </div>
  
  <p class="price"><strong>$ ${(prod.priceCents / 100).toFixed(2)}</strong></p>

  

<select name="quantity" class="quantity-select-${prod.id}">
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
  <option value="6">6</option>
  <option value="7">7</option>
   <option value="8">8</option>
    <option value="9">9</option>
     <option value="10">10</option>
</select>
</div> 

   <p class="added-msg-${prod.id}"></p>
   
<button class="add-to-cart-btn" data-product-id="${
    prod.id
  }"  > Add to cart</button>
  </div>

  `;
  return (document.querySelector(".product-container").innerHTML += prodHtml);
}

////// render Html
products.forEach((prod) => {
  return renderHtml(prod);
});

// /////////////////////////search btn/////////////////////////////////////////////
export function searchBtn() {
  const searchBar = document.querySelector("#search-bar");
  const searchBtn = document.querySelector(".search-btn");
  searchBtn.addEventListener("click", () => {
    let word = searchBar.value;

    const filteredArr = products.filter((prod) => {
      for (let i = 0; i < prod.keywords.length; i++) {
        const element = prod.keywords[i];
        if (element.includes(word)) {
          return prod;
        }
      }

      // console.log(products.keywords.includes(word));
    });
    console.log(filteredArr);
    if (filteredArr.length === 0) {
      document.querySelector(
        ".product-container"
      ).innerHTML = `<p>No Product Found</p>`;
    } else {
      document.querySelector(".product-container").innerHTML = "";
      filteredArr.forEach((prod) => {
        return renderHtml(prod);
      });
    }

    addToCartBtn();
  });
}
searchBtn();
function addToCartBtn() {
  ////////add to cart btn ////////////////////////////////////////////////////////////

  const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = e.target.dataset.productId;
      addToCart(targetId);
      // console.log("cart:", cart);
      updateCartQuantity();
    });
  });
}
addToCartBtn();
