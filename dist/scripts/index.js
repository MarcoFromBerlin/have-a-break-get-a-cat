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
      "https://api.thecatapi.com/v1/images/?limit=2&page=0&order=DESC&",
      true
    );
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("x-api-key", "17d94b92-754f-46eb-99a0-65be65b5d18f");
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

        document
          .querySelector(".cat__images__container")
          .insertBefore(img, document.querySelectorAll(".cat__div")[0]);
        // document.querySelector(".cat__images__container").appendChild(img);
      });
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
      document.querySelector(".cat__images__container").appendChild(endSlide);
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
    // console.log("ennd");
    let now = new Date();
    // console.log(now);

    const item = {
      // value: value,
      expiry: now.setSeconds(now.getSeconds() + 3),
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

// IMAGES

const nextImg = (e) => {
  // console.log("vtotalSlides", totalSlides);
  // console.log("count", count);
  // console.log("count === totalSlides", count === totalSlides);
  if (e.target.classList.contains("cat__div") && count !== totalSlides) {
    // console.log("click");
    // TOTAL width - Div Width
    // console.log(e.target.offsetWidth);
    e.target.style.width = `${0}px`;
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
