document.addEventListener("DOMContentLoaded", () => {
  new Glide(".glide", {
    hoverpause: true,
    // autoplay: 20000,
    type: "carousel",
    startAt: 0,
    animationTimingFunc: "ease-in-out",
    gap: 100,
    perView: 3
  }).mount();

  let prevBtn = document.getElementById("prev");
  let nextBtn = document.getElementById("next");

  let background = document.querySelector(".background");
  let indices = document.querySelectorAll(".index");

  let bgImgs = [
    "Bespin_bg.jpg",
    "Naboo_bg.jpg",
    "Coruscant_bg.jpg",
    "Tatooine_bg.jpg"
  ];

  let currentIndex = 0;

  indices.forEach(index => index.classList.remove("active"));
  indices[currentIndex].classList.add("active");

  const myAnimation = new hoverEffect({
    parent: document.querySelector(".background"),
    intensity: 0.3,
    imagesRatio: 1080 / 1920,
    image1: `./images/${bgImgs[0]}`,
    image2: `./images/${bgImgs[1]}`,
    displacementImage: "./images/diss (1).jpg",
    hover: false
  });

  const myAnimation2 = new hoverEffect({
    parent: document.querySelector(".background"),
    intensity: 0.3,
    imagesRatio: 1080 / 1920,
    image1: `./images/${bgImgs[1]}`,
    image2: `./images/${bgImgs[2]}`,
    displacementImage: "./images/diss (1).jpg",
    hover: false
  });

  const myAnimation3 = new hoverEffect({
    parent: document.querySelector(".background"),
    intensity: 0.3,
    imagesRatio: 1080 / 1920,
    image1: `./images/${bgImgs[2]}`,
    image2: `./images/${bgImgs[3]}`,
    displacementImage: "./images/diss (1).jpg",
    hover: false
  });

  const myAnimation4 = new hoverEffect({
    parent: document.querySelector(".background"),
    intensity: 0.3,
    imagesRatio: 1080 / 1920,
    image1: `./images/${bgImgs[3]}`,
    image2: `./images/${bgImgs[0]}`,
    displacementImage: "./images/diss (1).jpg",
    hover: false
  });

  const distortionAnimations = [
    myAnimation,
    myAnimation2,
    myAnimation3,
    myAnimation4
  ];

  function startNextDistortionAnimation() {
    let prevIndex = currentIndex;
    currentIndex = (currentIndex + 1) % 4;
    indices.forEach(index => index.classList.remove("active"));
    indices[currentIndex].classList.add("active");
    distortionAnimations[prevIndex].next();
    showTextAnimation("next");
    setTimeout(() => {
      let canvas = background.querySelectorAll("canvas");
      background.appendChild(canvas[0]);
      distortionAnimations[prevIndex].previous();
    }, 1200);
  }

  function startPrevDistortionAnimation() {
    currentIndex = currentIndex - 1 < 0 ? 3 : currentIndex - 1;
    indices.forEach(index => index.classList.remove("active"));
    indices[currentIndex].classList.add("active");
    distortionAnimations[currentIndex].next();
    showTextAnimation("prev");
    setTimeout(() => {
      let canvas = background.querySelectorAll("canvas");
      background.insertBefore(canvas[canvas.length - 1], background.firstChild);
      distortionAnimations[currentIndex].previous();
    }, 500);
  }

  nextBtn.addEventListener("click", () => {
    startNextDistortionAnimation();
  });

  prevBtn.addEventListener("click", () => {
    startPrevDistortionAnimation();
  });

  let titleDisplacement = 0;
  let descriptionDisplacement = 0;

  function showTextAnimation(direction) {
    if (titleDisplacement === 0 && direction === "prev") {
      titleDisplacement = -540;
    } else if (titleDisplacement === -540 && direction === "next") {
      titleDisplacement = 0;
    } else {
      titleDisplacement =
        direction === "next"
          ? titleDisplacement - 180
          : titleDisplacement + 180;
    }

    if (descriptionDisplacement === 0 && direction === "prev") {
      descriptionDisplacement = -165;
    } else if (descriptionDisplacement === -165 && direction === "next") {
      descriptionDisplacement = 0;
    } else {
      descriptionDisplacement =
        direction === "prev"
          ? descriptionDisplacement + 55
          : descriptionDisplacement - 55;
    }

    let title = document.querySelectorAll("#title h4");

    title.forEach(title => {
      gsap.to(title, {
        duration: 1,
        top: `${titleDisplacement}px`,
        ease: "power4.easeInOut"
      });
    });

    let description = document.querySelectorAll("#description p");

    description.forEach((description, index) => {
      let opacity = 0;
      if (index === currentIndex) {
        opacity = 1;
      } else {
        opacity = 0;
      }
      gsap.to(description, {
        duration: 1,
        top: `${descriptionDisplacement}px`,
        ease: "power4.easeInOut",
        opacity: opacity
      });
    });

    const nav = document.querySelector("nav");
    const search = document.querySelector(".search");

    if (currentIndex === 1 || currentIndex === 2) {
      nav.style.color = "#333";
      search.style.color = "#fff";
      search.style.backgroundColor = "#333";
    } else {
      nav.style.color = "#fff";
      search.style.backgroundColor = "#fff";
      search.style.color = "#333";
    }
  }
});
