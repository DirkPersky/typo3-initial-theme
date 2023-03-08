/*
 * Copyright (c) 2021.
 *
 * @category TYPO3
 *
 * @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */
window.addEventListener('DOMContentLoaded', () => {
    var $offset = 150;
    // init swup
    window.swupLoad = new Swup({
        cache: false,
        debugMode: false,
        animateHistoryBrowsing: true,
        plugins: [
            new SwupOverlayTheme(),
            new SwupFormsPlugin({formSelector: 'form:not([data-ajax-form])'}),
            new SwupScrollPlugin({
                doScrollingRightAway: false,
                animateScroll: {
                    betweenPages: true,
                    samePageWithHash: false,
                    samePage: false
                },
                scrollFriction: 0.2,
                scrollAcceleration: 0.04,
                offset: $offset // offset when anchor scroll
            })
        ],
        containers: ["#swup"],
        skipPopStateHandling: function (event) {
            // abort if fancy is open
            if(typeof window.fancyStartClose != 'undefined' && window.fancyStartClose) return true;

            if (event.state && event.state.source == "swup") {
                return false;
            }
            return true;
        },
        linkSelector:
            'a[href^="' +
            window.location.origin +
            '"]:not([data-no-swup]):not(.various), a[href^="/"]:not([data-no-swup]):not(.various), a[href^="#"]:not([data-no-swup]):not(.various)'
    });
    // page change
    window.swupLoad.on('contentReplaced', function (e, i) {
        // wait for handler after scoll
        window.swupLoad.on('scrollDone', (e) => {
            // unbind handler
            window.swupLoad.off('scrollDone');
            // rebind scripts
            window.StateManager.call();
        });
        // Swup Scolling
        if (typeof window.formScroll != "undefined") {
            window.formScroll($offset);
        } else if (window.location.href.indexOf('#') == -1 && u('div[data-swup-scroll]').length > 0) {
            // only do if no anker is defined
            window.swupLoad.scrollTo(u('div[data-swup-scroll]').first().offsetTop - $offset);
        } else if(!window.swupLoad.findPlugin('ScrollPlugin')){
            // if ScrollPlugInIs disabled
            window.StateManager.call();
        } else if(window.scrollY <= (window.innerHeight / 2)){
            // if no scroll needed fire direct
            window.swupLoad.triggerEvent('scrollDone');
        }
    });
}, false);




