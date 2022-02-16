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
      } else {
        console.log(
          "ERROR: The attempt to fetch " +
            url +
            " failed with HTTP status " +
            xhr.status +
            "." +
            "Check your browser's JavaScript console. "
        );
      } 
    };
    xhr.open(method, url);
    xhr.send();
    console.log("Fetching data from " + url + "...");
  }
   const getSelected = document.getElementById('currency');
   const url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json";

  const dataCrypto = (data => {

    Object.keys(data.usd).forEach(key=> {
        console.log(key, data.usd[key]);
        const optionValue = data.usd[key];
        let opt = key;
        let element = document.createElement("option");
        element.textContent = opt;
        element.setAttribute("value", data.usd[key]); 
        getSelected.appendChild(element);
        console.log(data.usd)
      })
  
    })
fetch("Get",url,dataCrypto)