"use strict";

const sideBar = document.querySelector(".side-bar");
const products = document.querySelector(".products");
const productsCart = document.querySelector(".products-cart");
sideBar.style.transition = "150ms";

// Функция для создания HTML-кода продукта
function createProductHTML(productData) {
  return `
      <div class="img-frame"> 
        <img class="img-product" src="${productData.image}"> 
      </div>
      <p class="id">Id: ${productData.id}</p>
      <p style="width: 187px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
        Title: ${productData.title}
      </p> 
      <p class="desc" style="width: 187px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
        Desc: ${productData.description}
      </p>
      <p>Category: ${productData.category}</p>
      <p>Count: ${productData.rating.count}</p> 
      <div class="price-rating">
        <div class="rate"> 
          <img src="photos/star.png" style="width: 20px; height: 20px;"/>  
          <p>${productData.rating.rate}</p>
        </div>
        <div class="price">
          <img id="${
            productData.id - 1
          }" class="add-prod" src="photos/vector.png" style="width: 18px; height: 20px;"/>  
          <p>${productData.price}$</p>
        </div>
      </div>`;
}

function handleAddToCartClick(el, productData) {
  let countler = 1;
  const productsDiv = document.createElement("div");
  productsDiv.classList.add("product-in-cart");
  productsDiv.innerHTML = `
    <div class="img-frame">
      <img class="img-product" src="${productData.image}" />
    </div>
    <p style="width: 140px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
      ${productData.title}
    </p>
    <p>${productData.price}$</p>
    <div class="product-countler">
      <img class="plus" id="${el.id}" src="photos/plus2.png" width=30px height=30px/>
      <p class="countler" id="${el.id}" style="font-size: 18px; margin-top: 3px">${countler}</p>
      <img class="minus" id="${el.id}" src="photos/minus.png" width=30px height=30px/>
    </div>
  </div>`;
  productsCart.appendChild(productsDiv);

  const plus = document.querySelectorAll(".plus");
  const minus = document.querySelectorAll(".minus");
  const countProd = document.querySelectorAll(".countler");

  plus[plus.length - 1].addEventListener("click", () => {
    let count = parseInt(countProd[plus.length - 1].textContent);
    if (count < 100) {
      count++;
      countProd[plus.length - 1].textContent = count;
    }
  });

  minus[minus.length - 1].addEventListener("click", () => {
    let count = parseInt(countProd[minus.length - 1].textContent);
    if (count > 0) {
      count--;
      countProd[minus.length - 1].textContent = count;
    }
    if (count === 0) {
      productsCart.removeChild(productsDiv);
    }
  });
}

async function createProduct() {
  try {
    const res = await axios.get("https://fakestoreapi.com/products");
    for (let i = 0; i < res.data.length; i++) {
      const productData = res.data[i];

      const newDiv = document.createElement("div");
      newDiv.classList.add("product");
      newDiv.innerHTML = createProductHTML(productData);

      const addProdButton = newDiv.querySelector(".add-prod");
      addProdButton.addEventListener("click", () => {
        handleAddToCartClick(addProdButton, productData);
      });

      products.appendChild(newDiv);
    }
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
}

createProduct();
