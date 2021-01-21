// API
let isLoaded = false;

function getUserDataWithPromise() {
  var xhr = new XMLHttpRequest();

  return new Promise(function (resolve, reject) {
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status >= 300) {
          reject("Error, status code = " + xhr.status);
        } else {
          resolve(xhr.responseText);
        }
      }
    };
    xhr.open(
      "GET",
      "https://api.thecatapi.com/v1/images/?limit=5&page=0&order=DESC&",
      true
    );
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("x-api-key", "17d94b92-754f-46eb-99a0-65be65b5d18f");
    xhr.send();
  });
}

getUserDataWithPromise()
  .then(
    function (result) {
      var data = JSON.parse(result);

      data.forEach((image) => {
        const img = document.createElement("img");
        img.className = "cat__img";

        img.src = image.url;
        document.querySelector(".cat__images__container").appendChild(img);
      });
    },
    function (error) {
      console.log(error);
    }
  )
  .then((isLoaded = true));

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
