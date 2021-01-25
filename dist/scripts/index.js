let getTime = localStorage.getItem("timeObj");

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
      "https://api.thecatapi.com/v1/images/?limit=10&page=0&order=DESC",
      true
    );
    xhr.setRequestHeader("Content-Type", "application/json");
    // xhr.withCredentials = true;

    xhr.setRequestHeader("x-api-key", "f50103ca-a71f-4573-8555-b50a862496d1");
    // xhr.setRequestHeader("x-api-key", "17d94b92-754f-46eb-99a0-65be65b5d18f");
    // e856f8ad-7b46-4dcb-8412-813d667e3204
    xhr.send();
  });
}
// console.log(new Date() > new Date(JSON.parse(getTime)?.expiry));
// console.log(!getTime);
// if (!getTime) {
if (!getTime || new Date() > new Date(JSON.parse(getTime)?.expiry)) {
  getUserDataWithPromise().then(
    function (result) {
      var data = JSON.parse(result);
      console.log(result);
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
        img.style.transformOrigin = "top left";

        document
          .querySelector(".cat__images__container")
          .insertBefore(img, document.querySelectorAll(".cat__div")[1]);
        // document.querySelector(".cat__images__container").appendChild(img);
      });

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

      // endSlide.innerHTML = "<h1>Paragraph changed!</h1>";
      // document.querySelector(".cat__images__container").appendChild(startSlide);

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

      // endSlide.innerHTML = "<h1>Paragraph changed!</h1>";
      // document.querySelector(".cat__images__container").appendChild(endSlide);
    },
    function (error) {
      console.log(error);
    }
  );
}
// }

// API END

// CHECK USER

console.log(new Date()); // check if or not
console.log(new Date(JSON.parse(getTime)?.expiry)); // check if or not

console.log(new Date() > new Date(JSON.parse(getTime)?.expiry));

function countEnd() {
  if (count === totalSlides) {
    play();
    // console.log("ennd");
    let now = new Date();
    // console.log(now);

    const item = {
      // value: value,
      expiry: now.setSeconds(now.getSeconds() + 1),
      // expiry: now.setHours(now.getHours() + 3),
    };

    localStorage.setItem("timeObj", JSON.stringify(item));
    // if (!getTime)

    // console.log(JSON.parse(getTime).expiry); // check if or not
  }
}
// CHECK END

// OBSERVER
let count = 0;

// MUST BE A NODE NOT A NODE LIST!!!
var target1 = document.querySelector(".cat__images__container");
// var target2 = count;
var totalSlides;
// create an observer instance
var observer = new MutationObserver(function (mutations) {
  //   console.log(mutations.length);
  if (mutations.length > 0) {
    isLoaded = true;
    // console.log(document.querySelectorAll(".cat__div"));
    // console.log(totalSlides);
    totalSlides = document.querySelectorAll(".cat__div").length - 1;
  }
});

// configuration of the observer:
var config = { attributes: true, childList: true, characterData: true };

// pass in the target node, as well as the observer options
observer.observe(target1, config);
// observer.observe(target2, config);

// PLAY
function play() {
  var audio = document.getElementById("meow");
  audio.play();
}

// IMAGES

const nextImg = (e) => {
  // console.log("vtotalSlides", totalSlides);
  // console.log("count", count);
  // console.log("count === totalSlides", count === totalSlides);

  let isIn = e.target.classList.contains("cat__div");
  //   ||
  //   e.target.classList.contains("fas");
  // // console.log(isIn);
  // console.log(e.target.classList);
  if (isIn && count !== totalSlides) {
    // console.log("click");
    // console.log(
    //   e.target.children[1]
    //     .querySelector(".btn__pawn")
    //     .classList.contains("btn__pawn")
    // );
    // console.log(e.target.classList);
    // TOTAL width - Div Width
    // console.log(e.target.offsetWidth);
    if (count === 0) play();

    e.target.style.width = `${0}px`;
    e.target.style.opacity = "0";
    // e.target.style.transform = "scaleX(0)";
    // e.target.parentElement.querySelector(".cat__div").style.marginLeft = `-${
    //   e.target.parentElement.parentElement.parentElement.offsetWidth -
    //   e.target.offsetWidth +
    //   e.target.offsetWidth
    // }px`;
    // e.target.parentElement.querySelector(".cat__div").style.marginLeft = `-${
    //   e.target.parentElement.parentElement.parentElement.offsetWidth -
    //   e.target.offsetWidth +
    //   e.target.offsetWidth
    // }px`;
    count++;

    // triggers at counter end to set time
    countEnd();
  }
};

document.body.addEventListener("click", nextImg);
