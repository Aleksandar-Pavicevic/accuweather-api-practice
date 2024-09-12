let apikey = "3RATeANI8MOjRBf73OfarEcvCjUzA96Z";
let relevantResults = [];
let outputList = document.querySelector("#location-keys");

let input = document.querySelector("#input-field");
input.addEventListener("input", (e) => {
  e.preventDefault();
  let inputVal = e.target.value;
  console.log(inputVal);
  fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apikey}&q=${inputVal}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      relevantResults = [];
      outputList.innerHTML = "";
      for (const city in data) {
        relevantResults.push(`${data[city].LocalizedName}, ${data[city].Country.ID}`);
      }
      relevantResults.forEach((item) => {
        let li = document.createElement("li");
        li.innerText = item;
        outputList.appendChild(li);
      });
      // fetch(`http://dataservice.accuweather.com/locations/v1/${locationKey}?apikey=${apikey}`)
      //   .then((response) => {
      //     if (!response.ok) {
      //       throw new Error(`I just copied this ${response.status}`);
      //     }
      //     return response.json();
      //   })
      //   .then((data) => {
      //     console.log(data);
      //   });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
});
