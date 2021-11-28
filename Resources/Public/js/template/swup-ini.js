/*
 * Copyright (c) 2021.
 *
 * @category TYPO3
 *
 * @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */
jQuery(function ($) {
    var $offset = 150;
    // init swup
    window.swupLoad = new Swup({
        cache: false,
        debugMode: true,
        plugins: [
            new SwupOverlayTheme(),
            new SwupFormsPlugin({formSelector: 'form'}),
            new SwupScrollPlugin({
                doScrollingRightAway: false,
                animateScroll: true,
                scrollFriction: 0.3,
                scrollAcceleration: 0.04,
                offset: $offset // offset when anchor scroll
            })
        ]
    });
    // call Statemanager
    window.swupLoad.on('contentReplaced', function () {
        window.StateManager.call();
    });
    // overscroll if barba
    window.swupLoad.on('contentReplaced', function (e, i) {
        // only do if no anker is defined
        if (window.location.href.indexOf('#') == -1 && jQuery('div[data-swup-scroll]').length > 0) {
            window.swupLoad.scrollTo(jQuery('div[data-swup-scroll]').offset().top - $offset);
        }
    });
});



