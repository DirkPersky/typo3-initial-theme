/*
 * Copyright (c) 2021.
 *
 * @category TYPO3
 *
 * @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */

window.AnimateManager.attach('scroll-trigger', function () {
    // enter animation
    function onEnter(element) {
        window.DPAnimate.animate(element, {
            class: 'animated fast fadeIn',
        });
    }

    // bind Scroll handler
    window.DPAnimate.scrollTrigger('.animate:not(.row)', {
        start: 'top bottom-=10px',
        end: 'bottom top+=100px',
        once: true,
        onEnter: onEnter,
        onEnterBack: onEnter,
    });

    // enter animation
    function onEnter2(element) {
        window.DPAnimate.animate(element, {
            class: 'animated fast animated-show',
            onComplete: (e) => {
                element.style.removeProperty('visibility');
            }
        });
    }

    function onLeave2(element) {
        window.DPAnimate.animate(element, {
            class: 'animated fast animated-show',
            onComplete: (e) => {
                element.style.visibility = 'hidden';
            }
        });
    }

    // hide all by default
    $('.frame-layout-7').css({'visibility': 'hidden'})
    // bind Scroll handler
    window.DPAnimate.scrollTrigger('#c18 .ce-column, .frame-layout-7, .news-list-2 .article', {
        start: 'top bottom-=100px',
        end: 'bottom top+=150px',
        onEnter: onEnter2,
        onEnterBack: onEnter2,
        onLeave: onLeave2,
        onLeaveBack: onLeave2,
    });
});