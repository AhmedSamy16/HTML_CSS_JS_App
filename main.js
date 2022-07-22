// Start Functions

function handleActive(ev) {

    ev.target.parentElement.querySelectorAll(".active").forEach(elem => {

        elem.classList.remove("active");
    })

    ev.target.classList.add("active");
}
// End Functions
// Start Global Elements

if (localStorage.getItem("color_option") != null) {

    document.documentElement.style.setProperty("--main-color", localStorage.getItem("color_option"));

    document.querySelectorAll(".colors-list li").forEach(li => {

        li.classList.remove("active");

        if (li.dataset.color == localStorage.getItem("color_option")) {

            li.classList.add("active");
        }
    })
}

let landingPage = document.querySelector(".landing");

let imgsArray = [];

for (let i = 0; i < 6; i++) {

    imgsArray.push(`landing${i + 1}.jpg`);
};

let randomBackground = true;

let theInterval;

if (localStorage.getItem("back_option") != null) {

    document.querySelectorAll(".random-options span").forEach(span => {

        span.classList.remove("active");
    });

    if (localStorage.getItem("back_option") == "true") {

        randomBackground = true;

        document.querySelector(".random-options .yes").classList.add("active");

    } else {

        randomBackground = false;

        document.querySelector(".random-options .no").classList.add("active");

        if (localStorage.getItem("back_img") != null) {

            landingPage.style.backgroundImage = localStorage.getItem("back_img");
    }
    }
}

document.querySelector(".settings .icon").onclick = function () {

    this.parentElement.classList.toggle("open");

}

let colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach(li => {

    li.addEventListener("click", e => {

        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);

        localStorage.setItem("color_option", e.target.dataset.color);

        handleActive(e);
    })
});

let randomBackEl = document.querySelectorAll(".random-options span");

randomBackEl.forEach(span => {

    span.addEventListener("click", e => {

        handleActive(e);

        if (e.target.dataset.back == "yes") {

            randomBackground = true;

            randomImages();

            localStorage.setItem("back_option", true);

        } else {

            randomBackground = false;

            clearInterval(theInterval);

            localStorage.setItem("back_option", false);

            localStorage.setItem("back_img", landingPage.style.backgroundImage);
        }
    })

})

document.querySelector(".settings").addEventListener("click", e => {

    if (e.target.className == "remove") {

        e.target.parentElement.parentElement.classList.remove("open")
    }

    if (e.target.className == "reset") {

        localStorage.clear();

        window.location.reload();
    }
})


let allBullets = document.querySelectorAll(".nav-bullets .bullet");

allBullets.forEach(bullet => {

    bullet.addEventListener("click", e => {

        document.querySelector(e.target.dataset.section).scrollIntoView({

            behavior: "smooth"
        })
    })
})

let allOptions = document.querySelectorAll(".bullets-options span");

let navContent = document.querySelector(".nav-bullets");

if (localStorage.getItem("bullets_option") != null) {

    allOptions.forEach(span => {

        span.classList.remove("active");
    })

    navContent.style.display = localStorage.getItem("bullets_option");

    if (localStorage.getItem("bullets_option") == "block") {

        document.querySelector(".bullets-options .yes").classList.add("active");

    }

    if (localStorage.getItem("bullets_option") == "none") {

        document.querySelector(".bullets-options .no").classList.add("active");

    }

}

allOptions.forEach(span => {

    span.addEventListener("click", e => {

        navContent.style.display = e.target.dataset.display;

        handleActive(e);

        localStorage.setItem("bullets_option", e.target.dataset.display);
    })
})
// End Global Elements

// Start Landing Page

function randomImages() {

    if (randomBackground == true) {

        theInterval = setInterval(() => {

            let randomNum = Math.floor(Math.random() * imgsArray.length);
        
            landingPage.style.backgroundImage = `url(images/${imgsArray[randomNum]})`;
        
        }, 1000);

    }
}

randomImages();

let theButton = document.querySelector(".menu");

let ulLinks = document.querySelector(".landing .header ul");

theButton.onclick = function (e) {

    e.stopPropagation();

    this.classList.toggle("active");

    ulLinks.classList.toggle("open");
}

document.addEventListener("click", e => {

    if (e.target !== theButton && e.target !== ulLinks) {

        if (ulLinks.classList.contains("open")) {

            theButton.classList.remove("active");

            ulLinks.classList.remove("open");
        }

    }
})
// End Landing Page

// Start Skills

let skillsContent = document.querySelector(".skills");

window.onscroll = function () {

    if (window.scrollY > skillsContent.offsetTop - 400) {

        document.querySelectorAll(".skill-progress span").forEach(span => {

            span.style.width = span.dataset.width;
        })
    }
}
// End Skills

// Start Gallery

let galleryImgs = document.querySelectorAll(".gallery img");

galleryImgs.forEach(img => {

    img.addEventListener("click", e => {

        // Popup Overlay
        let overlay = document.createElement("div");

        overlay.className = "popup-overlay";

        document.body.appendChild(overlay);

        // Popup Box
        let popBox = document.createElement("div");

        popBox.className = "popup-box";

        if (img.alt != null) {

            let heading = document.createElement("h3");

            let headingText = document.createTextNode(img.alt);

            heading.appendChild(headingText);

            popBox.appendChild(heading);
        }

        let popImg = document.createElement("img");

        popImg.src = img.src;

        popBox.appendChild(popImg);

        document.body.appendChild(popBox);

        let close = document.createElement("span");

        close.className = "close";

        let closeText = document.createTextNode('X');

        close.appendChild(closeText);

        popBox.appendChild(close);
    })
})

document.addEventListener("click", e => {

    if (e.target.className == "close") {

        e.target.parentElement.remove();

        document.querySelector(".popup-overlay").remove();

    }
})
// End Gallery