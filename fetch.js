"use strict";


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