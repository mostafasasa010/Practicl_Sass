let mainColor = localStorage.getItem("color_option");

if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", localStorage.getItem("color_option"));
  document.querySelectorAll(".colors span").forEach(color => {
    color.classList.remove("active");

    if (color.dataset.color === document.documentElement.style.getPropertyValue("--main-color")) {
      color.classList.add("active");
    }
  });
}

let randomBackground = "yes";

let backgroundInterval;

let mainBackgroundRandom = localStorage.getItem("random_option");

let mainBackgroundImage = localStorage.getItem("back_option");

if (mainBackgroundRandom !== null) {
  document.querySelectorAll(`.options > span`).forEach((e) => {
    e.classList.remove("active");
  });
  document.querySelector(`.options .${mainBackgroundRandom}`).classList.add("active");

  if (mainBackgroundRandom === "no") {
    randomBackground = "no";
    clearInterval(backgroundInterval);
    document.querySelector(".no-active").classList.add("active");
  }
}

if (mainBackgroundImage !== null) {
  document.querySelector(".landing-page").style.backgroundImage = `url(${mainBackgroundImage})`;
}

let settingBox = document.querySelector(".settings-box");
let ToggoleIcon = document.querySelector(".toggole-icon");
let GearIcon = document.querySelector(".toggole-icon i");

ToggoleIcon.onclick = () => {
  ToggoleIcon.classList.toggle("active");
  settingBox.classList.toggle("active");
  GearIcon.classList.toggle("fa-spin");
}

let colors = document.querySelectorAll(".colors span");

colors.forEach((color) => {
  color.addEventListener("click", (e) => {
    document.documentElement.style.setProperty("--main-color", e.target.dataset.color);

    localStorage.setItem("color_option", e.target.dataset.color);

    colors.forEach((color) => {
      color.classList.remove("active");
    });
    e.target.classList.add("active");
  })
});

let YesNo = document.querySelectorAll(".options > span");

YesNo.forEach(e => {
  e.addEventListener("click", (e) => {
    YesNo.forEach(e => {
      e.classList.remove("active");
    });
    e.target.classList.add("active");
    if (document.querySelector(".options .yes").classList.contains("active")) {
      localStorage.setItem("random_option", "yes");
      window.location.reload();
    } else {
      randomBackground = "no";
      clearInterval(backgroundInterval);
      localStorage.setItem("random_option", "no");
      document.querySelector(".no-active").classList.add("active");
    };
  });
});

document.querySelectorAll(".no-active .imgs img").forEach((img) => {
  img.addEventListener("click", (e) => {
    document.querySelector(".landing-page").style.backgroundImage = `url(${e.target.dataset.img})`;
    localStorage.setItem("back_option", e.target.dataset.img);
  });
});

let landingPage = document.querySelector(".landing-page");

let arrayImgs = ["imgs/01.jpg", "imgs/02.jpg", "imgs/03.jpg", "imgs/04.jpg", "imgs/05.jpg"];

function randomaizeImg() {
  if (randomBackground === "yes") {
    backgroundInterval = setInterval(() => {
      let randomNum = Math.floor(Math.random() * arrayImgs.length);

      landingPage.style.backgroundImage = `url(../../../imgs/0${randomNum + 1}.jpg)`;
    }, 10000);
  }
}

randomaizeImg();

let ourSkills = document.querySelector(".our-skills");

let upBtn = document.querySelector(".up");

window.onscroll = function () {
  if (window.scrollY >= (ourSkills.offsetTop - 50)) {
    document.querySelectorAll(".skill-box .progress .progress-bar").forEach(span => {
      span.style.width = span.dataset.width;
    })
  }

  if (window.scrollY >= 700) {
    upBtn.style.display = "flex";
  } else {
    upBtn.style.display = "none";
  }

  let scroller = document.querySelector(".scroller");
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrollTop = document.documentElement.scrollTop;
  scroller.style.width = `${(scrollTop / height) * 100}%`;
};

upBtn.onclick = function () {
  document.querySelector(".landing-page").scrollIntoView({
    behavior: "smooth"
  })
};

let ourGalleryImgs = document.querySelectorAll(".our-gallery img");

ourGalleryImgs.forEach(img => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "overlay-popup";
    document.body.appendChild(overlay);

    let popup = document.createElement("div");
    popup.className = "popup-div";
    document.body.appendChild(popup);

    let image = document.createElement("img");
    image.src = e.target.src;
    popup.appendChild(image);

    let closeBtn = document.createElement("span");
    closeBtn.className = "close-btn";
    closeBtn.textContent = "X";
    popup.appendChild(closeBtn);

    closeBtn.onclick = () => {
      popup.remove();
      overlay.remove();
    }
  })
});

let bullets = document.querySelectorAll(".bullets .bullet");

let allLinks = document.querySelectorAll(".links a");

function scrollToSection(elements) {
  elements.forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
};

scrollToSection(bullets);
scrollToSection(allLinks);

let trueFalse = document.querySelectorAll(".option-box .selectors > div");
let bulletLocalItem = localStorage.getItem("bullet_option");

if (bulletLocalItem !== null) {
  trueFalse.forEach(el => {
    el.classList.remove("active");
  });
  if (bulletLocalItem === "no") {
    bullets.forEach(bullet => {
      bullet.style.display = "none";
    });
    document.querySelector(".option-box .selectors .false").classList.add("active");
  } else {
    bullets.forEach(bullet => {
      bullet.style.display = "block";
    });
    document.querySelector(".option-box .selectors .true").classList.add("active");
  };
};

trueFalse.forEach(ele => {
  ele.addEventListener("click", (e) => {
    trueFalse.forEach((el) => {
      el.classList.remove("active");
    })
    e.target.classList.add("active");

    if (e.target.classList.contains("false")) {
      bullets.forEach(e => {
        e.style.display = "none";
      })
      localStorage.setItem("bullet_option", "no");
    } else {
      bullets.forEach(e => {
        e.style.display = "block";
        localStorage.setItem("bullet_option", "yes");
      });
    };
  });
});

let reset = document.querySelector(".settings-box .reset");

reset.onclick = () => {
  localStorage.clear();
  window.location.reload();
};

let toggoleBtn = document.querySelector(".icon-toggole");
let toggoleLinks = document.querySelector(".links-toggole");

toggoleBtn.onclick = () => {
  if (toggoleLinks.style.display === "none") {
    toggoleLinks.style.display = "block";
  } else {
    toggoleLinks.style.display = "none";
  };
};