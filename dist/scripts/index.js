let getTime = localStorage.getItem("timeObj");
let now = new Date();

// SET SIZE SLIDES

// set start SLIDE
const startSlide = document.querySelector(".slide__start");
// startSlide.style.backgroundColor = "red";
startSlide.style.width = `${
  document.body.querySelector(".cat__images__main").offsetWidth
}px`;
startSlide.style.height = `${
  document.body.querySelector(".cat__images__main").offsetHeight
}px`;
startSlide.style.transition = "all 0.5s";
startSlide.style.transformOrigin = "top left";

// set end SLIDE
const endSlide = document.querySelector(".slide__end");
// endSlide.style.backgroundColor = "red";
endSlide.style.width = `${
  document.body.querySelector(".cat__images__main").offsetWidth
}px`;
endSlide.style.height = `${
  document.body.querySelector(".cat__images__main").offsetHeight
}px`;
endSlide.style.transition = "all 0.5s";

// set end HIDE COUNTER
const setCounterWidth = () => {
  var counterSlide = document.querySelector(".slide__counter");
  // counterSlide.style.backgroundColor = "red";
  counterSlide.style.width = `${
    document.body.querySelector(".cat__images__main").offsetWidth
  }px`;
  counterSlide.style.height = `${
    document.body.querySelector(".cat__images__main").offsetHeight
  }px`;
  counterSlide.style.transition = "all 0.5s";
};

setCounterWidth();

const setContainerSize = () => {
  const catImgCont = document.querySelector(".cat__images__container");

  // set the width of the div container
  catImgCont.style.width = `${
    document.body.querySelector(".cat__images__main").offsetWidth
  }px`;
};

setContainerSize();

if (new Date() < new Date(JSON.parse(getTime)?.expiry)) {
  setCounterWidth();

  document.querySelector(".slide__counter").style.display = "block";

  setInterval(function () {
    var countDownDate = new Date(JSON.parse(getTime)?.expiry).getTime();
    let getNowTime = new Date().getTime();
    var distance = countDownDate - getNowTime;

    // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document
      .querySelector(".slide__counter")
      .querySelector(".time__counter").innerHTML =
      hours + " Hours " + minutes + " Minutes " + seconds + " Seconds";

    // clear TIME
    if (distance < 0) {
      clearInterval();
      document
        .querySelector(".slide__counter")
        .querySelector(".time__counter").innerHTML = "EXPIRED";
      localStorage.removeItem("timeObj");
      location.reload();
    }
  }, 1000);
}

// END SET SLIDES

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
      // "https://api.thecatapi.com/v1/images/?limit=5&api_key=f50103ca-a71f-4573-8555-b50a862496d1",
      // "https://api.thecatapi.com/v1/favourites",
      "https://api.thecatapi.com/v1/images/?limit=2&page=0&order=DESC",
      true
    );
    xhr.setRequestHeader("Content-Type", "application/json");

    // xhr.setRequestHeader("x-api-key", "f50103ca-a71f-4573-8555-b50a862496d1");
    xhr.setRequestHeader("x-api-key", "17d94b92-754f-46eb-99a0-65be65b5d18f");
    // e856f8ad-7b46-4dcb-8412-813d667e3204
    xhr.send();
  });
}

if (!getTime || new Date() > new Date(JSON.parse(getTime)?.expiry)) {
  getUserDataWithPromise().then(
    function (result) {
      var data = JSON.parse(result);
      data.forEach((image) => {
        // console.log(image.image.url);

        const img = document.createElement("div");
        img.className = "cat__div";

        img.style.backgroundImage = `url('${image.url}')`;
        img.style.width = `${
          document.body.querySelector(".cat__images__main").offsetWidth
        }px`;
        // img.style.width = "100%";
        img.style.height = `${
          document.body.querySelector(".cat__images__main").offsetHeight
        }px`;
        img.style.transition = "all 0.5s";
        img.style.transformOrigin = "top left";

        document
          .querySelector(".cat__images__container")
          .insertBefore(img, document.querySelectorAll(".cat__div")[2]);
        // document.querySelector(".cat__images__container").appendChild(img);
      });
    },
    function (error) {
      console.log(error);
    }
  );
}

// API END

// CHECK USER
function countEnd() {
  if (count === totalSlides) {
    play();

    const item = {
      expiry: now.setSeconds(now.getSeconds() + 12),
      // expiry: now.setHours(now.getHours() + 3),
    };

    localStorage.setItem("timeObj", JSON.stringify(item));
  }
}
// CHECK END

// OBSERVER
let count = 0;

// MUST BE A NODE NOT A NODE LIST!!!
var target1 = document.querySelector(".cat__images__container");

var totalSlides;

// create an observer instance
var observer = new MutationObserver(function (mutations) {
  if (mutations.length > 0) {
    isLoaded = true;

    totalSlides = document.querySelectorAll(".cat__div").length - 2;
  }
});

// configuration of the observer:
var config = { attributes: true, childList: true, characterData: true };

// pass in the target node, as well as the observer options
observer.observe(target1, config);

// PLAY
function play() {
  var audio = document.getElementById("meow");
  audio.play();
}

// IMAGES

const nextImg = (e) => {
  if (
    (e.target.classList.contains("cat__title") ||
      e.target.classList.contains("fa-paw") ||
      e.target.classList.contains("text__start")) &&
    count !== totalSlides
  ) {
    if (count === 0) play();
    e.target.parentElement.parentElement.style.width = `${0}px`;
    e.target.parentElement.parentElement.style.opacity = "0";
    count++;

    // triggers at counter end to set time
    countEnd();
  }

  if (e.target.classList.contains("cat__div") && count !== totalSlides) {
    if (count === 0) play();
    e.target.style.width = `${0}px`;
    e.target.style.opacity = "0";
    count++;

    // triggers at counter end to set time
    countEnd();
  }
};

document.body.addEventListener("click", nextImg);
