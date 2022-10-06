/*
 * Copyright (c) 2021.
 *
 * @category TYPO3
 *
 * @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */

window.AnimateManager.attach('bs-header-nav', function () {
    function onEnter(){
        document.querySelector('html').classList.add('nav--sticky');

    }
    function onLeave(){
        document.querySelector('html').classList.remove('nav--sticky');
    }
    // bind Scroll handler
    window.DPAnimate.scrollTrigger('section.slider', {
        start: 'bottom top+=130px',
        // once: false,
        onEnter: onEnter,
        onLeaveBack: onLeave,
    });
});