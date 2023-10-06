"use strict";
const sideBar = document.getElementsByClassName("side-bar")[0];
const products = document.getElementsByClassName("products")[0];
sideBar.style.transition = "150ms";

async function createProduct(i) {
  const res = await axios.get("https://fakestoreapi.com/products");
  for (let i = 0; i < res.data.length; i++) {
    const productData = res.data[i];

    const newDiv = document.createElement("div");
    newDiv.classList.add("product");
    newDiv.innerHTML = `
    <div class="img-frame"> 
        <img class="img-product" src="${productData.image}"> 
    </div>
    <p class= "id">Id: ${productData.id}</p>
    <p style="width: 187px; text-overflow: ellipsis; white-space: nowrap;
    overflow: hidden;">Title: ${productData.title}</p>
    <p class= "desc" style="width: 187px; text-overflow: ellipsis; white-space: nowrap;
    overflow: hidden;">Desc: ${productData.description} </p>
    <p>Category: ${productData.category} </p>
    <p>Count: ${productData.rating.count} </p> 
    <div class="price-rating">
        <div class="rate"> 
            <img src="photos/star.png" style="width: 20px; height: 20px;"> </img> 
            <p>${productData.rating.rate} </p>
        </div>
        <div class="price">
            <img src="photos/vector.png" style="width: 18px; height: 20px;"> </img> 
            <p>${productData.price}$ </p>
        </div>
    </div>
  `;
    products.appendChild(newDiv);
  }
}

createProduct(0);
