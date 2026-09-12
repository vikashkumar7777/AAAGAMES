
// SCREENSHOT VIEWER


const screenshotLinks = document.querySelectorAll(".image-container a");

screenshotLinks.forEach(function(link, index) {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        let currentIndex = index;

        const fullImage = document.createElement("div");

        fullImage.classList.add("fullscreen-image");

        fullImage.innerHTML = `
            <button class="previous-image">&#10094;</button>

            <img src="${link.querySelector("img").src}" 
                 alt="${link.querySelector("img").alt}">

            <button class="next-image">&#10095;</button>

            <button class="close-image">&times;</button>

            <div class="image-counter">
                ${currentIndex + 1} / ${screenshotLinks.length}
            </div>
        `;

        document.body.appendChild(fullImage);

        const fullImageElement = fullImage.querySelector("img");
        const previousButton = fullImage.querySelector(".previous-image");
        const nextButton = fullImage.querySelector(".next-image");
        const closeButton = fullImage.querySelector(".close-image");
        const counter = fullImage.querySelector(".image-counter");
                // MOBILE SWIPE
        let touchStartX = 0;
        let touchEndX = 0;

        fullImage.addEventListener("touchstart", function(event) {

            touchStartX = event.changedTouches[0].screenX;

        });

        fullImage.addEventListener("touchend", function(event) {

            touchEndX = event.changedTouches[0].screenX;

            const swipeDistance = touchEndX - touchStartX;

            if (Math.abs(swipeDistance) > 50) {

                if (swipeDistance < 0) {
                   
                    nextButton.click();
                } 
                else {
                    
                    previousButton.click();
                }

            }

        });


        function showImage(index) {

            currentIndex = index;

            const image = screenshotLinks[currentIndex].querySelector("img");

            fullImageElement.src = image.src;
            fullImageElement.alt = image.alt;

            counter.textContent =
                `${currentIndex + 1} / ${screenshotLinks.length}`;
        }


        nextButton.addEventListener("click", function() {

            currentIndex++;

            if (currentIndex >= screenshotLinks.length) {
                currentIndex = 0;
            }

            showImage(currentIndex);

        });


        previousButton.addEventListener("click", function() {

            currentIndex--;

            if (currentIndex < 0) {
                currentIndex = screenshotLinks.length - 1;
            }

            showImage(currentIndex);

        });


        closeButton.addEventListener("click", function() {
            

            fullImage.remove();

        });
        document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowRight") {
        currentIndex++;

        if (currentIndex >= screenshotLinks.length) {
            currentIndex = 0;
        }

        showImage(currentIndex);
    }

    if (event.key === "ArrowLeft") {
        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = screenshotLinks.length - 1;
        }

        showImage(currentIndex);
    }

    if (event.key === "Escape") {
        fullImage.remove();
    }

});

    });

});
