const prodContainer = document.querySelector(".product-container");
const cartArray = [];

let prodHtml = "";
function renderHtml(prod) {
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
  return (prodContainer.innerHTML = prodHtml);
}

////// render Html
products.forEach((prod) => {
  return renderHtml(prod);
});

// /////////////////////////search btn/////////////////////////////////////////////

const searchBar = document.querySelector("#search-bar");
const searchBtn = document.querySelector(".search-btn");
searchBtn.addEventListener("click", () => {
  prodHtml = "";
  prodContainer.innerHTML = "";
  let word = searchBar.value.toLowerCase().slice(0, 4);

  const filteredArr = products.filter((prod) => {
    return prod.name.toLowerCase().includes(word);
  });
  console.log(filteredArr);
  if (filteredArr.length === 0) {
    prodContainer.innerHTML = `<p>No Product Found</p>`;
  } else {
    filteredArr.forEach((prod) => {
      return renderHtml(prod);
    });
  }

  addToCartBtn();
});

function addToCartBtn() {
  // //////add to cart btn ////////////////////////////////////////////////////////////

  const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let totalQty = 0;
      const targetId = e.target.dataset.productId;

      products.forEach((product) => {
        if (product.id === targetId) {
          ///Add to cart
          cartArray.push(product);

          // // /////Added to cart msg
          const element = document.querySelector(`.added-msg-${product.id}`);
          if (element) {
            element.classList.remove("addTransition");
            element.innerHTML = "Added";

            setTimeout(() => {
              element.classList.add("addTransition");
            }, "2000");
          }

          //avoide duplicate in cart

          for (let i = 0; i < cartArray.length; i++) {
            const productDpl = cartArray[i];

            if (findIndex(cart, productDpl) === -1) {
              cart.push(productDpl);
            }
          }

          ////drop down input
          const inputElement = document.querySelector(
            `.quantity-select-${product.id}`
          );

          // //////////////update quantity of each product

          cart.forEach((prod) => {
            if (prod.id === targetId) {
              console.log(prod.qty, Number(inputElement.value));
              if (Number(inputElement.value) === 1) {
                if (!prod.qty) {
                  prod.qty = Number(inputElement.value);
                } else {
                  prod.qty += Number(inputElement.value);
                }
              } else {
                if (!prod.qty) {
                  prod.qty = Number(inputElement.value);
                } else {
                  prod.qty += Number(inputElement.value);
                }
              }
            }
            /////////total Quantity
            totalQty += prod.qty;
          });

          ////////////////show cart quantity
          const cartQuantity = document.querySelectorAll(".cart-quantity");
          cartQuantity.forEach((qty) => {
            qty.innerHTML = totalQty;
          });
        }
      });

      console.log("cart:", cart);
    });
  });
}
addToCartBtn();
///find index
function findIndex(array, word) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === word) {
      return i;
    }
  }

  return -1;
}

//////////////////////////////cart HTML////////////////////////////////////////////////
