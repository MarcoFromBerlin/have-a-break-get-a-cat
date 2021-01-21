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
      "https://api.thecatapi.com/v1/images/?limit=2&page=0&order=DESC&",
      true
    );
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("x-api-key", "17d94b92-754f-46eb-99a0-65be65b5d18f");
    xhr.send();
  });
}

getUserDataWithPromise().then(
  function (result) {
    var data = JSON.parse(result);

    data.forEach((image) => {
      const catImgCont = document.querySelector(".cat__images__container");

      // set the width of the div container
      catImgCont.style.width = `${
        document.body.querySelector(".cat__images__main").offsetWidth
      }px`;

      const img = document.createElement("div");
      img.className = "cat__div";

      img.style.backgroundImage = `url('${image.url}')`;
      img.style.width = `${
        document.body.querySelector(".cat__images__main").offsetWidth
      }px`;
      img.style.height = `${
        document.body.querySelector(".cat__images__main").offsetHeight
      }px`;
      img.style.transition = "all 0.5s";

      //   div.appendChild(img);
      //   imgCont.appendChild(img);
      document.querySelector(".cat__images__container").appendChild(img);
    });
    const endSlide = document.createElement("div");
    endSlide.className = "cat__div";
    endSlide.style.backgroundColor = "red";
    endSlide.style.width = `${
      document.body.querySelector(".cat__images__main").offsetWidth
    }px`;
    endSlide.style.height = `${
      document.body.querySelector(".cat__images__main").offsetHeight
    }px`;
    endSlide.style.transition = "all 0.5s";

    endSlide.innerHTML = "<h1>Paragraph changed!</h1>";
    document.querySelector(".cat__images__container").appendChild(endSlide);
  },
  function (error) {
    console.log(error);
  }
);

// API END

// if (isLoaded) {
//   const curImage = document.querySelectorAll(".cat__img");
//   console.log(
//     document.querySelector(".cat__images__container").childNodes.length > 0
//   );
// }
// console.log(document.querySelector(".cat__images__container").parentNode);

// OBSERVER

// MUST BE A NODE NOT A NODE LIST!!!
var target = document.querySelector(".cat__images__container");
var totalSlides;
// create an observer instance
var observer = new MutationObserver(function (mutations) {
  //   console.log(mutations.length);
  if (mutations.length > 0) {
    isLoaded = true;
    // console.log(document.querySelectorAll(".cat__div"));
    console.log(totalSlides);
    totalSlides = document.querySelectorAll(".cat__div").length - 1;
  }
});

// configuration of the observer:
var config = { attributes: true, childList: true, characterData: true };

// pass in the target node, as well as the observer options
observer.observe(target, config);

// IMAGES
let count = 0;

const nextImg = (e) => {
  // console.log(totalSlides);
  // console.log(count);
  if (e.target.classList.contains("cat__div")) {
    console.log("click");
    // TOTAL width - Div Width

    e.target.style.width = `${0}px`;
    e.target.parentElement.querySelector(".cat__div").style.marginLeft = `-${
      e.target.parentElement.parentElement.parentElement.offsetWidth -
      e.target.offsetWidth
    }px`;
    count++;
  }
  // if (e.target.classList.contains("cat__div") && count >= totalSlides) {
  //   console.log("end");
  //   // e.target.style.width = `${1000}px`;
  // }
};

document.body.addEventListener("click", nextImg);
