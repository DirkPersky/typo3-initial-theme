/*
 * Copyright (c) 2021.
 *
 * @category TYPO3
 *
 * @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */

window.GSAPManager.attach('scroll-trigger', function () {
    // check if ScrollTrigger exist
    if (typeof ScrollTrigger == 'undefined') return;
    // get elements
    var items = jQuery('#c18 .ce-column, .frame-layout-7, .news-list-2 .article, .animate');
    // if no items abort
    if (items.length == 0) return;
    // loop items
    items.map((i, element) => {
        element.classList.add('animated-show')
        // init Scroltrigger
        var trigger = ScrollTrigger.create({
            trigger: element,
            start: 'top bottom-=100px',
            end: 'bottom top+=100px',
            scrub: 1,
            onEnter: e => element.classList.remove('animated-show'),
            onEnterBack: e => element.classList.remove('animated-show'),
            onLeave: e => element.classList.add('animated-show'),
            onLeaveBack: e => element.classList.add('animated-show')
        });
    });
});