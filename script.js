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
    <img src="${productData.image}" style="width: 150px;">
    <p>Id: ${productData.id}</p>
    <p style="width: 223px; text-overflow: ellipsis; white-space: nowrap;
    overflow: hidden;">Title: ${productData.title}</p>
    <p class= "desc" style="width: 223px; text-overflow: ellipsis; white-space: nowrap;
    overflow: hidden;">Description: ${productData.description} </p>
    <p>Price: ${productData.price} </p>
    <p>Category: ${productData.category} </p>
    <p>Rating: ${productData.rating.rate} </p>
    <p>Count: ${productData.rating.count} </p>
  `;
    products.appendChild(newDiv);
  }
}

createProduct(0);
