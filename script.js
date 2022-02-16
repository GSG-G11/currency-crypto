"use strict";


// Getting Html elements TO MINIPULATE THEM.
const getSelected = document.getElementById("currency");
const currunciesUrl =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json";
const form = document.getElementById("crypto");

// getting the options sorted in the select field
const dataCrypto = (data) => {
  Object.keys(data.usd).forEach((key) => {
    const optionValue = data.usd[key];
    let opt = key;
    let element = document.createElement("option");
    element.textContent = opt;
    element.setAttribute("value", data.usd[key]);
    getSelected.appendChild(element);
  });
};

// getting the selected option before moving to the next page
const selectFun = () => {
  let value = getSelected.options[getSelected.selectedIndex].value;
  let textValue = getSelected.options[getSelected.selectedIndex].textContent;
  return [value, textValue];
}

// getting the data and move to the main page
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const values = selectFun();
  localStorage.setItem("currencyValue", values[0]);
  localStorage.setItem("currency", values[1]);
  location.href = "./crypto/crypto.html";
});

// getting the data from the API
fetch(currunciesUrl, dataCrypto);
