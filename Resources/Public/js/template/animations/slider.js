/*
 * Copyright (c) 2021.
 *
 * @category TYPO3
 *
 * @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */

window.AnimateManager.attach('slider-text', function () {
    function onEnter(element) {
        // get left col Header
        var sliderText = new SplitType('section.slider .carousel-item.active .carousel-caption', {types: "words, chars"});
        // inimate Text
        window.DPAnimate.animate(sliderText.chars, {
            class: 'animated textBounceLeft',
            stagger: 0.02,
            delay: .3,
            onComplete: e => sliderText.revert()
        });
    }

    // bind Scroll handler
    window.DPAnimate.scrollTrigger('#swup.main--content', {
        start: 'top top',
        end: 'top top-=150',
        once: true,
        onEnter: onEnter,
        onEnterBack: onEnter,
    });

});