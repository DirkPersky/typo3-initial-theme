/*
 * Copyright (c) 2021.
 *
 * @category TYPO3
 *
 * @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */


window.GSAPManager.attach('animation-row', function () {
    var $rowElements = $('.row.animate');

    // enter animation
    function onEnter(element) {
        var $element = $(element),
            timeLine = gsap.timeline();
        // get left col Header
        var sliderText = new SplitType($element.find('> div:first-child header').find('*'), {types: "words, chars"});
        timeLine.from($element.find('> div:not(:first-child)'), {
            duration: 0.6,
            x: 100,
            autoAlpha: 0,
            ease: "back",
            stagger: 0.02
        }, 1);
        // animation def
        timeLine.from(sliderText.chars, {
            duration: 0.4,
            scale: 4,
            autoAlpha: 0,
            rotationX: -180,
            transformOrigin: "100% 50%",
            ease: "back",
            stagger: 0.02
        }, 1);
        // complete callback
        timeLine.then(e => {
            sliderText.revert(); // rese to normal text
        });
    }

    ScrollTrigger.batch($rowElements, {
        start: 'top bottom-=150px',
        end: 'bottom top+=150px',
        // once: false,
        onEnter: onEnter,
        onEnterBack: onEnter,
    });
})