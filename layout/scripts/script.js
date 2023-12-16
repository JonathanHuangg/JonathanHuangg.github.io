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


    /* Get hardcoded size of figures */ 
    var style = window.getComputedStyle(figures[0]) /* Retrieves values of all css properties*/ 
    var margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    var figureWidth = figures[0].getBoundingClientRect().width + margin;


    function initFigures() {
        document.getElementById("figureCarousel").style.visibility = 'visible';
        figures.forEach((fig, idx) => {
            fig.style.transition = 'none';
            fig.style.transform = `translateX(${idx}%)`;
            fig.classList.remove('active');

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
        }, 1); //
    }

    function showFigures(startIndex) {
        figures.forEach((fig, idx) => {
            const VisiblePortion = idx - startIndex;

            /* Slide offset (recall the figureWidth has margin */

            const offset = VisiblePortion * figureWidth

            fig.style.transform = `translateX(-${offset}%)`;

            if (idx >= startIndex && idx < startIndex + numFiguresToShow) {
                fig.classList.add('active');
            } else {
                fig.classList.remove('active');
            }
        })
    }

    function nextFigures() {
        currIndex = (currIndex + 1) % figures.length;
        showFigures(currIndex);
    }

    function prevFigures() {
        currIndex = (currIndex - 1 + figures.length) % figures.length;
        showFigures(currIndex)
    }

    document.getElementById("next").addEventListener("click", nextFigures);
    document.getElementById("prev").addEventListener("click", prevFigures);

    initFigures();

});