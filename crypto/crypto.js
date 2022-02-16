"use strict";


// Getting Html elements TO MINIPULATE THEM.
const formInput = document.querySelector("input");
document.querySelector("form").onsubmit = (e) => e.prventDefault(); // Cancel the default action, if needed
const top100 = "https://api.coincap.io/v2/assets";
// const selectedCurruncy = Number(localStorage.getItem("curruncy")) || 1;
const table = document.querySelector("table");
const tBody = document.querySelector("tbody");
table.appendChild(tBody);


// a fetch function to get the data from the API
function fetch(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(JSON.parse(xhr.responseText));
    } else if (xhr.status  === 404 ) {
      console.log(
        "ERROR: The attempt to fetch " +
          url +
          " failed with HTTP status " +
          xhr.status +
          "." +
          "page not found. "
      );
    } else if (xhr.status  === 500 ) {
        console.log(
        "ERROR: The attempt to fetch " +
          url +
          " failed with HTTP status " +
          xhr.status +
          "." +
          "due to Internal Server Error. "
      );
    } 
  };
  xhr.open("GET", url);
  xhr.send();
}

// to sort the top 100 coins by market cap 
if(!formInput.value){
    fetch(top100, parseDataToDom);
} 

// to focus in the input field when the app is loaded
window.onload = () => {
  formInput.focus();
  
};

// to get the data from the API and parse it to the DOM when the form is submitted
formInput.addEventListener("input", (e) => {
    let removed = document.querySelectorAll(".row"); // to remove the no more needed rows from the table
    removed.forEach((el) => {
        el.remove();
    });
  let input = e.target.value;
  fetch(
    `https://api.coincap.io/v2/assets?limit=20&&search=${input}`,
    parseDataToDom
  );
});

// to parse the data from the API to the DOM
function parseDataToDom(apiData) {

    apiData.data.forEach((coin) => {   // to get every data from the API and make it to the DOM


    let tr = document.createElement("tr");
    tr.className = "row";

    let counter = document.createElement("td");
    counter.textContent = apiData.data.indexOf(coin) + 1;
    

    let name = document.createElement("td");
    name.textContent = coin.name;
    let symbol = document.createElement("span");
    symbol.className = "symbol";
    symbol.textContent =" ("+ coin.symbol +")";
    name.appendChild(symbol);

    let price = document.createElement("td");
    price.textContent = Number(coin.priceUsd).toFixed(2);

    let cahngeIn24 = document.createElement("td");
    cahngeIn24.textContent = Number(coin.changePercent24Hr).toFixed(2) + "%";

    let changeIn7 = document.createElement("td");
    changeIn7.textContent = Number(coin.vwap24Hr).toFixed(2);


    let marketCap = document.createElement("td");
    marketCap.textContent = (Number(coin.marketCapUsd) / 1000000).toFixed(2) + "M";
    marketCap.className = "disapearin600";

    let volume = document.createElement("td");
    volume.textContent = (Number(coin.volumeUsd24Hr)/ 1000000).toFixed(2) + "M";
    volume.className = "disapearin800";

    let circulatingSupply = document.createElement("td");
    circulatingSupply.textContent = (Number(coin.supply)/ 1000000).toFixed(2) + "M " + coin.symbol;
    circulatingSupply.className = "disapearin1000";
    

    tr.appendChild(counter);
    tr.appendChild(name);
    tr.appendChild(price);
    tr.appendChild(cahngeIn24);
    tr.appendChild(changeIn7);
    tr.appendChild(marketCap);
    tr.appendChild(volume);
    tr.appendChild(circulatingSupply);
    tBody.appendChild(tr);


     // to color the price section red or green
    coin.changePercent24Hr > 0 ? cahngeIn24.className = "green"  : cahngeIn24.className = "red";
    coin.changePercent24Hr > 0 ? price.className = "green"  : price.className = "red";
    coin.vwap24Hr - coin.priceUsd >= 0 ? changeIn7.className = "green disapearin500"  : changeIn7.className = "red disapearin500";

  });

}
