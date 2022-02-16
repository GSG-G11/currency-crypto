function fetch(method, url, callback) {
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
  xhr.open(method, url);
  xhr.send();
}
 const getSelected = document.getElementById('currency');
 const url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json";

const dataCrypto = (data => {

  Object.keys(data.usd).forEach(key=> {
      const optionValue = data.usd[key];
      let opt = key;
      let element = document.createElement("option");
      element.textContent = opt;
      element.setAttribute("value", data.usd[key]); 
      getSelected.appendChild(element);
    })
  //   const currencyVal = window.localStorage.setItem("currency", data.usd);
  //   console.log(currencyVal)
   
})

function selectFun() {

let value = getSelected.options[getSelected.selectedIndex].value;
let textValue = getSelected.options[getSelected.selectedIndex].textContent;
 return  [value, textValue ];
}


  // const submitBtn = document.getElementById('btn');
  const form = document.getElementById('crypto');
  
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const values = selectFun()
    localStorage.setItem("currencyValue", values[0]);
    localStorage.setItem("currency", values[1]);
    location.href = "./crypto/crypto.html";
    
  })
  
 
fetch("Get",url,dataCrypto);
