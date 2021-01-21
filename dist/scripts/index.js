// API
// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();
let isLoaded = false;
// Open a new connection, using the GET request on the URL endpoint
request.open(
  "GET",
  "https://api.thecatapi.com/v1/images/?limit=5&page=0&order=DESC&",
  true
);

// throws back error: CORS header ‘Access-Control-Allow-Origin’ is ‘*’
// request.withCredentials = true;

request.setRequestHeader("Content-Type", "application/json");

request.setRequestHeader("x-api-key", "17d94b92-754f-46eb-99a0-65be65b5d18f");
// request.setRequestHeader("x-api-key", "e856f8ad-7b46-4dcb-8412-813d667e3204");

request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach((image) => {
      const img = document.createElement("img");
      img.className = "cat__img";

      img.src = image.url;
      document.querySelector(".cat__images__container").appendChild(img);
    });
    isLoaded = true;
  } else {
    console.log("error");
  }
};

// Send request
request.send();

// API END

// OBSERVER

if (isLoaded) {
  const curImage = document.querySelectorAll("cat__img");
  console.log(curImage);
}

// IMAGES
const nextImg = (e) => {
  if (e.target.classList.contains("cat__img")) {
    console.log("cat img");
  }
};
document.body.addEventListener("click", nextImg);
