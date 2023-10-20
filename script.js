"use strict";
const sideBar = document.querySelector(".side-bar");
const products = document.querySelector(".products");
const productsCart = document.querySelector(".products-cart");
sideBar.style.transition = "150ms";
const productsInCart = [];

function generateProductElement(productData) {
  const productDiv = document.createElement("div");
  productDiv.classList.add("product");

  const imgFrameDiv = document.createElement("div");
  imgFrameDiv.classList.add("img-frame");

  const imgProduct = document.createElement("img");
  imgProduct.classList.add("img-product");
  imgProduct.src = productData.image;

  imgFrameDiv.appendChild(imgProduct);

  const idPara = document.createElement("p");
  idPara.classList.add("id");
  idPara.textContent = `Id: ${productData.id}`;

  const titlePara = document.createElement("p");
  titlePara.style.cssText =
    "width: 187px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;";
  titlePara.textContent = `Title: ${productData.title}`;

  const descPara = document.createElement("p");
  descPara.classList.add("desc");
  descPara.style.cssText =
    "width: 187px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;";
  descPara.textContent = `Desc: ${productData.description}`;

  const categoryPara = document.createElement("p");
  categoryPara.textContent = `Category: ${productData.category}`;

  const countPara = document.createElement("p");
  countPara.textContent = `Count: ${productData.rating.count}`;

  const priceRatingDiv = document.createElement("div");
  priceRatingDiv.classList.add("price-rating");

  const rateDiv = document.createElement("div");
  rateDiv.classList.add("rate");

  const rateImg = document.createElement("img");
  rateImg.src = "photos/star.png";
  rateImg.style.cssText = "width: 20px; height: 20px";

  const ratePara = document.createElement("p");
  ratePara.textContent = productData.rating.rate;

  rateDiv.appendChild(rateImg);
  rateDiv.appendChild(ratePara);

  const priceDiv = document.createElement("div");
  priceDiv.classList.add("price");

  const addProductImg = document.createElement("img");
  addProductImg.id = productData.id - 1;
  addProductImg.classList.add("add-prod");
  addProductImg.src = "./photos/vector.png";
  addProductImg.style.cssText = "width: 18px; height: 20px";

  const pricePara = document.createElement("p");
  pricePara.textContent = `${productData.price}$`;

  priceDiv.appendChild(addProductImg);
  priceDiv.appendChild(pricePara);

  priceRatingDiv.appendChild(rateDiv);
  priceRatingDiv.appendChild(priceDiv);

  productDiv.appendChild(imgFrameDiv);
  productDiv.appendChild(idPara);
  productDiv.appendChild(titlePara);
  productDiv.appendChild(descPara);
  productDiv.appendChild(categoryPara);
  productDiv.appendChild(countPara);
  productDiv.appendChild(priceRatingDiv);

  return productDiv;
}

function addToCartHandler(el, productData) {
  let counter = 1;
  const productsDiv = document.createElement("div");
  productsDiv.classList.add("product-in-cart");

  const imgFrameDiv = document.createElement("div");
  imgFrameDiv.classList.add("img-frame");

  const imgProduct = document.createElement("img");
  imgProduct.classList.add("img-product");
  imgProduct.src = productData.image;

  imgFrameDiv.appendChild(imgProduct);

  const titlePara = document.createElement("p");
  titlePara.style.cssText =
    "width: 140px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;";
  titlePara.textContent = productData.title;

  const pricePara = document.createElement("p");
  pricePara.textContent = `${productData.price}$`;

  const productCounterDiv = document.createElement("div");
  productCounterDiv.classList.add("product-counter");

  const plusImg = document.createElement("img");
  plusImg.classList.add("plus");
  plusImg.id = el.id;
  plusImg.src = "photos/plus2.png";
  plusImg.width = 30;
  plusImg.height = 30;

  const countPara = document.createElement("p");
  countPara.classList.add("counter");
  countPara.id = el.id;
  countPara.style.cssText = "font-size: 18px; margin-top: 3px";
  countPara.textContent = counter;

  const minusImg = document.createElement("img");
  minusImg.classList.add("minus");
  minusImg.id = el.id;
  minusImg.src = "photos/minus.png";
  minusImg.width = 30;
  minusImg.height = 30;

  productsDiv.appendChild(imgFrameDiv);
  productsDiv.appendChild(titlePara);
  productsDiv.appendChild(pricePara);

  productCounterDiv.appendChild(plusImg);
  productCounterDiv.appendChild(countPara);
  productCounterDiv.appendChild(minusImg);

  productsDiv.appendChild(productCounterDiv);

  productsCart.appendChild(productsDiv);

  const plus = document.querySelectorAll(".plus");
  const minus = document.querySelectorAll(".minus");
  const countProd = document.querySelectorAll(".counter");

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

      el.src = "photos/vector.png";
      const productIndex = productsInCart.indexOf(productData.id);
      if (productIndex !== -1) {
        productsInCart.splice(productIndex, 1);
      }
    }
  });
}

async function fetchAndDisplayProducts() {
  try {
    const res = await axios.get("https://fakestoreapi.com/products");

    res.data.forEach((el) => {
      const productData = el;
      const productElement = generateProductElement(productData);
      const addProdButton = productElement.querySelector(".add-prod");

      addProdButton.addEventListener("click", () => {
        const prodfind = productsInCart.find((el) => el === productData.id);
        if (!prodfind) {
          addToCartHandler(addProdButton, productData);
          addProdButton.setAttribute("src", "./photos/filled_vector.png");
          productsInCart.push(productData.id);
        }
      });

      products.appendChild(productElement);
    });
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
}

fetchAndDisplayProducts();
