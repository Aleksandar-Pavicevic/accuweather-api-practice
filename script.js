let apikey = "iaJUuvAXKYDljjhGs7gAv0d8eFAoNgm9";
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
      for (let i = 0; i < data.length; i++) {
        relevantResults.push([data[i].LocalizedName, data[i].Country.ID]);
      }
      relevantResults.forEach((item) => {
        let li = document.createElement("li");
        li.innerText = item[0];
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
