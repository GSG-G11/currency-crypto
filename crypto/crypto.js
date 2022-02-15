


const fetch = (method, url, cb) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status === 200) {
        cb(JSON.parse(xhr.responseText));
      }
    };
    xhr.open(method, url);
    xhr.send();
  };
  const url = "https://api.coincap.io/v2/assets";
  const dataCrypto = (data => {
    console.log(data);
  })

fetch("Get",url,dataCrypto)