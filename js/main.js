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

    var homeSection = $('#home-section'),
        homeHeader = $('#home-section h1'),
        isHeaderSet = false,
        currentlySetSection = '';

    _MainFunction = {

        SetHeader : function() {
            homeHeader.css({
                'top' : '0',
                'font-size' : '2.5em',
            });

            $('.nav-bar').addClass('nav-bar-after');
            $('.nav-bar a').css({
                'font-size' : '1.5em'
            });
            isHeaderSet = true;
            return _MainFunction;
        },

        setContentSection : function(sectionName) {
            if(currentlySetSection != '') {
                _MainFunction.unSetContentSection(currentlySetSection);
            }
            $(sectionName).css({
                'display' : 'block',
                'z-index' : '2',
                'top' : '20%'
            });
            $(sectionName).addClass('web-section-after');
            currentlySetSection = sectionName;
            return _MainFunction;
        },

        unSetContentSection : function(currentSection) {
            $(currentSection).css({
                'top' : '100%'
            });
        }

    }

    // $(w).on('load', function() {
    //     _MainFunction.SetHeader();
    // });

    $('.nav-bar a').on('click', function(e) {
        e.preventDefault();
        var clickedLinkSection = $(this).attr('href');
        if(!isHeaderSet) {
            _MainFunction.SetHeader();
        }
        _MainFunction.setContentSection(clickedLinkSection);
        // $('html, body').animate({
        //     scrollTop : $($(this).attr('href')).offset().top
        // },500);
    });

})(jQuery, window, document);