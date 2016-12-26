/**
 *  @author : abhishek goswami ( hiro )
 *
 *  main.js
 */
(function($, w, d) {

    var homeSection = $('#home-section'),
        homeHeader = $('#home-section h1'),
        isHeaderSet = false,
        currentlySetSection = '',
        closeButton = $('#close'),
        isCloseButtonVisible = false,
        setHeaderNavHeight,
        unsetHeaderNavHeight,
        setHeaderTop = 0,
        unSetHeaderTop,
        setHeaderHeight,
        unSetHeaderHeight,
        setHeaderNavTop,
        unsetHeaderNavTop;

    _MainFunction = {

        SetHeader : function() {
            homeHeader.css({
                'top' : setHeaderTop,
                'font-size' : setHeaderHeight
            });

            $('.nav-bar').css({
                'top' : setHeaderNavTop
            });
            $('.nav-bar a').css({
                'font-size' : setHeaderNavHeight
            });
            isHeaderSet = true;
            return _MainFunction;
        },

        unSetHeader : function() {
            homeHeader.css({
                'top' : unSetHeaderTop,
                'font-size' : unSetHeaderHeight,
            });
            $('.nav-bar').css({
               'top' : unsetHeaderNavTop
            });
            $('.nav-bar a').css({
                'font-size' : unsetHeaderNavHeight
            });

            isHeaderSet = false;
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
            return _MainFunction;
        },

        setCloseButton : function() {

            if(!isCloseButtonVisible) {
                closeButton.css({
                    'display' : 'block'
                });
            }
            isCloseButtonVisible = true;
            return _MainFunction;
        },

        unSetCloseButton : function() {

            if(isCloseButtonVisible) {
                closeButton.css({
                    'display' : 'none'
                });
            }

            isCloseButtonVisible = false;
            return _MainFunction;
        },

        setSelectedLink : function(element) {

            _MainFunction.applyOnMouseOverActionOnNavBar();
            _MainFunction.DeactivateLink($('.nav-bar a'));
            $(element).on('mouseout', function() {
                $(element).css({
                    'border-bottom' : '2px solid black'
                });
            });
            _MainFunction.ActivateLink(element);
        },

        unSetSelectedLinks : function(element) {

            $('.nav-bar a').css({
                'border-bottom' : 'none'
            });

            _MainFunction.applyOnMouseOverActionOnNavBar();
        },

        applyOnMouseOverActionOnNavBar : function() {

            $('.nav-bar a').on('mouseover', function() {
                _MainFunction.ActivateLink($(this));
            });

            $('.nav-bar a').on('mouseout', function() {
                _MainFunction.DeactivateLink($(this));
            });
        },

        /* set the border bottom to 2px for the clicked link */
        ActivateLink : function(element) {
            $(element).css({
                'border-bottom' : '2px solid black'
            });
        },

        /* set the border bottom to none for the clicked link */
        DeactivateLink : function(element) {
            $(element).css({
                'border-bottom' : 'none'
            });
        },

        setDimension : function() {
            var windowWidth = w.innerWidth;
            if(windowWidth <= 670 && windowWidth > 400) {

                setHeaderHeight = '2em';
                setHeaderNavHeight = '1.2em';

                unSetHeaderHeight = '8vh';
                unsetHeaderNavHeight = '4vh';

                unSetHeaderTop = '35%';
                unsetHeaderNavTop = '50%';

                setHeaderNavTop = '12%';

            }
            else if(windowWidth <= 400) {

                setHeaderHeight = '2em';
                setHeaderNavHeight = '1em';

                unSetHeaderHeight = '7vh';
                unsetHeaderNavHeight = '3.5vh';

                unSetHeaderTop = '37%';
                unsetHeaderNavTop = '50%';

                setHeaderNavTop = '11%';

            }
            else if(windowWidth > 670) {

                setHeaderHeight = '2.5em';
                unSetHeaderHeight = '12vh';

                setHeaderNavHeight = '1.5em';
                unsetHeaderNavHeight = '6vh';

                unSetHeaderTop = '28%';
                unsetHeaderNavTop = '50%';

                setHeaderNavTop = '13%';
            }
            return _MainFunction;
        }

    }

    $('.nav-bar a').on('click', function(e) {
        e.preventDefault();
        var clickedLinkSection = $(this).attr('href');
        _MainFunction.setSelectedLink($(this));
        _MainFunction.SetHeader().setContentSection(clickedLinkSection).setCloseButton();
    });

    closeButton.on('click', function() {
        _MainFunction.unSetCloseButton().unSetContentSection(currentlySetSection).unSetHeader().unSetSelectedLinks();
    });

    $(w).on('load', function() {
       _MainFunction.setDimension();
    });

    $(w).on('resize', function() {
        _MainFunction.setDimension();
        if(!isHeaderSet) {
            _MainFunction.unSetHeader();
        }
        else {
            _MainFunction.SetHeader();
        }
    });

})(jQuery, window, document);