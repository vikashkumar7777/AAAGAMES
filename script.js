const search = document.querySelector("#search");
const games = document.querySelectorAll(".game-card");
const results = document.querySelector("#search-results");


// Show matching games while typing
search.addEventListener("input", function() {

    const searchText = search.value.toLowerCase();

    results.innerHTML = "";
    if (searchText === "") {
        games.forEach(function(game) {
            game.style.display = "block";
        });
        return;
    }

    if (searchText === "") {
        return;
    }

    games.forEach(function(game) {

        const gameName = game.textContent.toLowerCase();

        if (gameName.includes(searchText)) {

            const result = document.createElement("div");
            result.textContent = game.textContent.trim();
            result.addEventListener("click", function() {
            results.innerHTML = "";
            
                search.value = game.textContent.trim();
                games.forEach(function(otherGame) {
                    otherGame.style.display = "none";
                });
                game.style.display = "block";
                game.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            });

            

            results.appendChild(result);
        }

    });

});


// When Enter is pressed, scroll to the matching game
search.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        const searchText = search.value.toLowerCase();

        games.forEach(function(game) {

            const gameName = game.textContent.toLowerCase();

            if (gameName.includes(searchText)) {

                game.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }

        });

    }

});
// FEATURED GAMES SLIDESHOW

const featuredImage = document.querySelector("#featured-image");
const featuredLink = document.querySelector("#featured-link");
const dots = document.querySelectorAll(".dot");

const featuredGames = [
    {
        image: "img/b1f.jpg",
        link: "wukong.html"
    },

    {
        image: "img/gowf.jpg",
        link: "gow.html"
    },

    {
        image: "img/gotf.jpg",
        link: "got.html"
    },

    {
        image: "img/fh6f.jpg",
        link: "fh6.html"
    },

    {
        image: "img/rdrf.jpg",
        link: "rdr.html"
    }
];

let currentSlide = 0;


// SHOW SLIDE

function showSlide(index, direction = 1) {

    currentSlide = index;

    // Move current image out
    featuredImage.style.transform =
        direction === 1 ? "translateX(-100%)" : "translateX(100%)";

    setTimeout(function() {

        // Change the image
        featuredImage.src = featuredGames[currentSlide].image;

        // Change the link
        featuredLink.href = featuredGames[currentSlide].link;

        // Change blurred background
        document.querySelector(".featured").style.setProperty(
            "--featured-bg",
            `url("${featuredGames[currentSlide].image}")`
        );

        // Put new image on the opposite side
        featuredImage.style.transition = "none";

        featuredImage.style.transform =
            direction === 1 ? "translateX(100%)" : "translateX(-100%)";

        // Bring new image into the center
        setTimeout(function() {

            featuredImage.style.transition = "transform 0.5s ease";

            featuredImage.style.transform = "translateX(0)";

        }, 50);

    }, 250);


    // Update dots
    dots.forEach(function(dot) {
        dot.classList.remove("active");
    });

    dots[currentSlide].classList.add("active");
}


// AUTOMATIC SLIDESHOW

setInterval(function() {

    currentSlide++;

    if (currentSlide >= featuredGames.length) {
        currentSlide = 0;
    }

    showSlide(currentSlide, 1);

}, 3500);


// NEXT BUTTON

document.querySelector(".next").addEventListener("click", function() {

    currentSlide++;

    if (currentSlide >= featuredGames.length) {
        currentSlide = 0;
    }

    showSlide(currentSlide, 1);

});


// PREVIOUS BUTTON

document.querySelector(".previous").addEventListener("click", function() {

    currentSlide--;

    if (currentSlide < 0) {
        currentSlide = featuredGames.length - 1;
    }

    showSlide(currentSlide, -1);

});


// DOTS

dots.forEach(function(dot, index) {

    dot.addEventListener("click", function() {

        showSlide(index);

    });

});


// START SLIDESHOW

showSlide(0);