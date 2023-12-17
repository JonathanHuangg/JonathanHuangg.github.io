function toggleText(id) {
    var text = document.getElementById(id);
    console.log('toggleText function called with id:', id);
    if (text.classList.contains('expanded-text')) {
        text.classList.remove('expanded-text');
        text.classList.add('hidden-text');
    } else {
        text.classList.remove('hidden-text');
        text.classList.add('expanded-text');
    }
};

document.addEventListener("DOMContentLoaded", function () {
    var figures = document.querySelectorAll("#figureCarousel figure");
    var currIndex = 0;
    var numFiguresToShow = 3;

    let queue = [];
    
    
    /* DEPRECATED Carousel width is not needed anymore
    var carousel = document.getElementById('figureCarousel');
    var carouselStyle = window.getComputedStyle(carousel);
    var carouselWidth = carousel.getBoundingClientRect().width - parseFloat(carouselStyle.paddingLeft) - parseFloat(carouselStyle.paddingRight);
    */

    function initFigures() {
        document.getElementById("figureCarousel").style.visibility = 'visible';
        figures.forEach((fig, idx) => {
            
            fig.style.transition = 'none'; // Disable transitions for startup
            fig.classList.remove('active'); // keep everything invisibile at startup

            if (idx < numFiguresToShow) {
                fig.classList.add('active');
            }

            // Force a reflow to apply the transformation without transition
            void fig.offsetWidth;

            // Re-enable transitions
            fig.style.transition = '';
        })

        /* Allow translations again */
        setTimeout(() => {
            figures.forEach((fig) => {
                fig.style.transition = 'transform 0.5s ease-in-out'; 
            });
        }, 0.1); 
    }

    function showFigures(startIndex) {

        // Assume that we have 3 figures already there
        // Get the positions of all the active figures

        let positions = []
        document.querySelectorAll("#figureCarousel figure.active").forEach((activeFig, idx) => {
            let position = activeFig.offsetLeft;
            positions.push(position);
            console.log(`Active Figure ${idx} position from left: ${activeFig.offsetLeft}px`);
        });


    }

    function nextFigures() {
        currIndex = (currIndex + 1) % figures.length;
        showFigures(currIndex);
        document.querySelectorAll("#figureCarousel figure").forEach((fig, idx) => {
            console.log(`Figure ${idx} position from left: ${fig.offsetLeft}px`);
        });
    }

    function prevFigures() {
        currIndex = (currIndex - 1 + figures.length) % figures.length;
        showFigures(currIndex);
        document.querySelectorAll("#figureCarousel figure").forEach((fig, idx) => {
            console.log(`Figure ${idx} position from left: ${fig.offsetLeft}px`);
        });
    }

    document.getElementById("next").addEventListener("click", nextFigures);
    document.getElementById("prev").addEventListener("click", prevFigures);

    initFigures();

});