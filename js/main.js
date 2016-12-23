/**
 *  @author : abhishek goswami ( hiro )
 *
 *  main.js
 */
(function($, w, d) {

    /*
    *  if clicked on the link in the nav bar simply scroll
    *  to the specified div having delay of 1s
    */

    $('.nav-bar a').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop : $($(this).attr('href')).offset().top
        },500);
    });

})(jQuery, window, document);