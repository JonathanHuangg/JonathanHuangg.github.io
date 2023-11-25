function toggleText(id) {
    var text = document.getElementById(id);
    if (classList.contains('expanded text')) {
        text.classList.remove('expanded text');
        text.classList.add('hidden text');
    } else {
        text.classList.remove('hidden text');
        text.classList.remove('expanded text');
    }
}