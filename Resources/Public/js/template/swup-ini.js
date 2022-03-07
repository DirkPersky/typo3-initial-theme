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
            new SwupFormsPlugin({formSelector: 'form:not([data-ajax-form])'}),
            new SwupScrollPlugin({
                doScrollingRightAway: false,
                animateScroll: true,
                scrollFriction: 0.3,
                scrollAcceleration: 0.04,
                offset: $offset // offset when anchor scroll
            })
        ],
        skipPopStateHandling: function (event) {
            if (event.state && event.state.url == window.location.href) {
                return true;
            }
            if (event.state && event.state.source == "swup") {
                return false;
            }
            return true;
        },
        linkSelector:
            'a[href^="' +
            window.location.origin +
            '"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])'
    });
    // page change
    window.swupLoad.on('contentReplaced', function (e, i) {
        // wait for handler after scoll
        window.swupLoad.on('scrollDone', (e) => {
            // rebind scripts
            window.StateManager.call();
            // unbind handler
            window.swupLoad.off('scrollDone');
        });
        // Swup Scolling
        if (typeof window.formScroll != "undefined") {
            window.formScroll($offset);
        } else if (window.location.href.indexOf('#') == -1 && jQuery('div[data-swup-scroll]').length > 0) {
            // only do if no anker is defined
            window.swupLoad.scrollTo(jQuery('div[data-swup-scroll]').offset().top - $offset);
        } else {
            window.swupLoad.triggerEvent('scrollDone');
        }
    });
});




