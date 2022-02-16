
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
  
 
fetch(url,dataCrypto);
