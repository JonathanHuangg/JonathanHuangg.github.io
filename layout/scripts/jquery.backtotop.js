/*
Template Name: Chillaid
Author: <a href="https://www.os-templates.com/">OS Templates</a>
Author URI: https://www.os-templates.com/
Copyright: OS-Templates.com
Licence: Free to use under our free template licence terms
Licence URI: https://www.os-templates.com/template-terms
File: Back to Top JS
*/


jQuery(window).scroll(function () {
    if (jQuery(window).scrollTop() > 150) {
        jQuery("#backtotop").addClass("visible");
    } else {
        jQuery("#backtotop").removeClass("visible");
    }
});

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