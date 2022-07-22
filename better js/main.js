// Start Functions

function handleActive(ev) {

    ev.target.parentElement.querySelectorAll(".active").forEach(elem => {

        elem.classList.remove("active");
    })

    ev.target.classList.add("active");
}

// End Functions

// Start Variables 

let landingSection = document.querySelector(".landing");

let imgsArray = [];

for (let i = 0; i < 6; i++) {

    imgsArray.push(`landing${i + 1}.jpg`);
}

let colorsLi = document.querySelectorAll(".colors-list li");

let randomBack = true,

    theInterval;

let randomBackOptions = document.querySelectorAll(".random-back span");

let bulletsOption = document.querySelectorAll(".bullet-option span");

let navBullets = document.querySelector(".nav");

// End Variables 

// Start Gloal Elements

// Start Local Storages

if (localStorage.getItem("color_option") !== null) {

    document.documentElement.style.setProperty("--main-color", localStorage.getItem("color_option"));

    colorsLi.forEach(li => {

        li.classList.remove("active");

        if (li.dataset.color == localStorage.getItem("color_option")) {

            li.classList.add("active");
        }
    })
}

if (localStorage.getItem("back_option") !== null) {

    randomBackOptions.forEach(span => {

        span.classList.remove("active");
    })

    if (localStorage.getItem("back_option") == "true") {

        randomBack = true;

        document.querySelector(".random-back .yes").classList.add("active");
    } else {

        randomBack = false;

        document.querySelector(".random-back .no").classList.add("active");

        if (localStorage.getItem("img_option") !== null) {

            landingSection.style.backgroundImage = localStorage.getItem("img_option");
        }
    }

}

if (localStorage.getItem("bullet_option") !== null) {

    bulletsOption.forEach(span => {

        span.classList.remove("active");
    })

    navBullets.style.display = localStorage.getItem("bullet_option");

    if (localStorage.getItem("bullet_option") == "block") {

        document.querySelector(".bullet-option .yes").classList.add("active");
    } else {

        document.querySelector(".bullet-option .no").classList.add("active");
    }

}
// End Local Storages

// Settings Box

let mainIcon = document.querySelector(".settings i");

mainIcon.onclick = function () {

    this.parentElement.classList.toggle("open");
}

document.querySelector(".settings").addEventListener("click", e => {

    if (e.target.classList.contains("remove")) {

        this.parentElement.parentElement.classList.remove("open");
    } else if (e.target.classList.contains("reset")) {

        localStorage.clear();

        window.location.reload();
    }
})

colorsLi.forEach(li => {

    li.addEventListener("click", e => {

        handleActive(e);

        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);

        localStorage.setItem("color_option", e.target.dataset.color)
    })
})

randomBackOptions.forEach(span => {

    span.addEventListener("click", e => {

        handleActive(e);

        if (e.target.dataset.back == "yes") {

            randomBack = true;

            randomizeImages();

            localStorage.setItem("back_option", true);

        } else {

            randomBack = false;

            clearInterval(theInterval);

            localStorage.setItem("back_option", false);

            localStorage.setItem("img_option", landingSection.style.backgroundImage);
        }
    })
})

bulletsOption.forEach(span => {

    span.addEventListener("click", e => {

        handleActive(e);

        navBullets.style.display = e.target.dataset.display;

        localStorage.setItem("bullet_option", e.target.dataset.display);
    })
})

// Nav Bullets

let navOptions = document.querySelectorAll(".nav .bullet");

navOptions.forEach(bullet => {

    bullet.addEventListener("click", e => {

        document.querySelector(e.target.dataset.section).scrollIntoView({

            behavior: "smooth"
        })
    })
})

// End Gloal Elements

// Start Landing

function randomizeImages() {

    if (randomBack == true) {

        theInterval = setInterval(() => {

            let randomNum = Math.floor(Math.random() * imgsArray.length);
    
            landingSection.style.backgroundImage = `url(images/${imgsArray[randomNum]})`;
    
        }, 1000)
    }

}

randomizeImages();

let landingButton = document.querySelector(".menu");

let ulLinks = document.querySelector(".links-content ul");

landingButton.onclick = function (e) {

    e.stopPropagation();

    this.classList.toggle("active");

    ulLinks.classList.toggle("open");

}

document.addEventListener("click", (e) => {

    if (e.target !== landingButton && e.target !== ulLinks) {

        if (ulLinks.classList.contains("open")) {

            ulLinks.classList.remove("open");

            landingButton.classList.remove("active");
        }

    }
})
// End Landing 

// Start Skills 

let skillsSection = document.querySelector(".skills");

let widthSpan = document.querySelectorAll(".progress span")

window.onscroll = function () {

    if (window.scrollY > skillsSection.offsetTop - 400) {

        widthSpan.forEach(span => {

            span.style.width = span.dataset.width;
        })

    }
}
// End Skills 

// Start Gallery 

let galleryImgs = document.querySelectorAll(".box img");

galleryImgs.forEach(img => {

    img.addEventListener("click", e => {

        // Overlay
        let overlay = document.createElement("div");
        overlay.className = "overlay";
        document.body.appendChild(overlay);

        // Popup-Box
        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";

        if (img.alt !== null) {
            let boxHeading = document.createElement("h3"),
                headingText = document.createTextNode(img.alt);
            boxHeading.appendChild(headingText);
            popupBox.appendChild(boxHeading);
        }

        let popupImg = document.createElement("img");

        popupImg.src = img.src;

        popupBox.appendChild(popupImg);

        let closeSpan = document.createElement("span"),
            closeSpanText = document.createTextNode("X");

        closeSpan.className = "close";

        closeSpan.appendChild(closeSpanText);

        popupBox.appendChild(closeSpan);

        document.body.appendChild(popupBox);
    })
})

document.addEventListener("click", e => {

    if (e.target.className == "close") {

        e.target.parentElement.remove();

        document.querySelector(".overlay").remove();
    }
})
// End Gallery 