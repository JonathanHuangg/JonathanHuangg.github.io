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
}

document.addEventListener("DOMContentLoaded", function () {
    var figures = document.querySelectorAll("#figureCarousel figure");
    var currIndex = 0;
    var numFiguresToShow = 3;

    function showFigures(startIndex) {
        figures.forEach((fig, idx) => {
            if (idx >= startIndex && idx < startIndex + numFiguresToShow) {
                fig.classList.add('active');
            } else {
                fig.classList.remove('active');
            }
        })
    }

    function nextFigures() {
        currIndex = (currIndex + numFiguresToShow) % figures.length;
        showFigures(currIndex);
    }

    function prevFigures() {
        currIndex = (currIndex - numFiguresToShow + figures.length) % figures.length;
        showFigures(currIndex)
    }

    document.getElementById("next").addEventListener("click", nextFigures);
    document.getElementById("next").addEventListener("click", nextFigures);

    showFigures(currIndex);

});