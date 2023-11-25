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