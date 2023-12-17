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

/*

Queue system. The first numFiguresToShow figures are shown at startup and the first numFiguresToShow figures 
are always displayed. When you move out of the queue, you are moved out of the image to the right. 

*/
document.addEventListener("DOMContentLoaded", function () {
    var figures = document.querySelectorAll("#figureCarousel figure");
    var currIndex = 0;
    var numFiguresToShow = 3;

    let queue = [];
    let currPositions = []; // These are positions of where the figures should be. Does not follow the element. There 
                            // for simply resizing canvases
    
    /* DEPRECATED Carousel width is not needed anymore
    var carousel = document.getElementById('figureCarousel');
    var carouselStyle = window.getComputedStyle(carousel);
    var carouselWidth = carousel.getBoundingClientRect().width - parseFloat(carouselStyle.paddingLeft) - parseFloat(carouselStyle.paddingRight);
    */

    function initFigures() {
        var parent = document.getElementById("figureCarousel")
        parent.style.visibility = 'visible';
        var figureWidth = parent.offsetWidth / numFiguresToShow;


        figures.forEach((fig, idx) => {

            fig.classList.remove('active'); // Keep everything invisible at startup

            if (idx < numFiguresToShow) {
                fig.classList.add('active');
                fig.style.transform = `translateX(0px)`;
            } else {
                let positionOffset = figureWidth * (idx - numFiguresToShow + 1);
                console.log(`Figure ${idx} position from left: ${positionOffset}px`);
                fig.style.transform = `translateX(${positionOffset}px)`;
            }

            fig.style.transition = `transform 0.5s ease-in-out`;
            setTimeout(() => {
                var rect = fig.getBoundingClientRect();
                console.log(`Figure ${idx} position from left: ${rect.left}px`);
            }, 100); 
    
        });
    }

    function showFigures() {
        var figureWidth = document.getElementById("figureCarousel").offsetWidth / numFiguresToShow;

        figures.forEach((fig, idx) => {
            let newIdx = (idx - currIndex + figures.length) % figures.length;
            let positionOffset = newIdx < numFiguresToShow ? 0 : figureWidth * (newIdx - numFiguresToShow + 1);
    
            fig.style.transform = `translateX(${positionOffset}px)`;
            if (newIdx < numFiguresToShow) {
                fig.classList.add('active');
            } else {
                fig.classList.remove('active');
            }
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