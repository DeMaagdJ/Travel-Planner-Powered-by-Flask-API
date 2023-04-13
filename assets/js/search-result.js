function myFunction() {

    var cityValue = localStorage.getItem("cityValue");

    // for the headers
    var cityNameElW = document.querySelector(".cityNameElW");
    cityNameElW.innerHTML = cityValue.toUpperCase();

    var cityNameElT = document.querySelector("#title");
    cityNameElT.innerHTML = cityValue.toUpperCase() + " TRAVEL";
   

    get5Day(cityValue);
    // cityCoord(cityValue);
}

// Weather Dashboard
var get5Day = function (value) {

    // format api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + value + "&appid=386eafe2ba649945a853251bb7d3f25e";

    // make a request to the url
    fetch(apiUrl).then(function (response) {

        // request was successful
        if (response.ok) {
            response.json().then(function (data) {
            // console.log(data)

                let x = 4;
                let i = 1;

                while (i < 6) {
                    
                    var dateEl = document.querySelector("#day" + i);
                    var tempEl = document.querySelector("#temp" + i);
                    var iconEl = document.querySelector("#Icon" + i);

                    var date = moment().add(i, 'days').format('l');
                    dateEl.innerHTML = date;
                    // console.log("value for x: " + x)
                    
                    var temperatureValue = data.list[x].main.temp;
                    // console.log("temp: " + temperatureFarhenheit);
                    var temperatureFarhenheit = Math.round(((temperatureValue - 273.15) * 1.8) + 32) + "°F";
                    tempEl.innerHTML = temperatureFarhenheit;

                    var iconVal = data.list[x].weather[0].icon; // this is the code
                    // console.log("icon: " + iconVal);

                    if (iconVal === "50n" || iconVal === "50d") {
                        iconEl.classList.add("height: 64, width: 64");
                    }
                    else {
                        iconEl.setAttribute("src", "./assets/images/icons/" + iconVal + ".svg");
                    }

                    x += 8
                    i++
                }

            })
        }
    })
}


// // get city's coordinates & uv index for main dashboard
// var cityCoord = function (data) {

//     // format api url
//     var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + data + "&appid=386eafe2ba649945a853251bb7d3f25e";

//     // make a request to the url
//     fetch(apiUrl).then(function (response) {

//         // request was successful
//         if (response.ok) {
//             response.json().then(function (data) {

//                 // get remaining data for dashboard
//                 var lonValue = data['coord']['lon'];
//                 var latValue = data['coord']['lat'];

//                 var coord = (latValue + "," + lonValue);
//                 hotelSearch(coord);
//                 cityFood(coord);

//             })
//         }
//     })
// }


// Modal
function formSubmitHandler() {

    var inputValue = document.getElementById("inputValue").value;
    localStorage.setItem("cityValue", inputValue);

}