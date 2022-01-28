/*
 * Copyright (c) 2021.
 *
 * @category TYPO3
 *
 * @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */


window.AnimateManager.attach('animation-row', function () {
    // enter animation
    function onEnter(element) {
        var $element = $(element);
        // get left col Header
        var sliderText = new SplitType($element.find('> div:first-child header').find('*'), {types: "words, chars"});
        // animate right col
        window.DPAnimate.animate($element.find('> div:not(:first-child)'), {
            class: 'animated bounceInRight',
            delay: .3,
        });
        // inimate Text
        window.DPAnimate.animate(sliderText.chars, {
            class: 'animated textBounceLeft',
            stagger: 0.02,
            delay: .3,
            onComplete: e => sliderText.revert()
        });
    }

    // bind Scroll handler
    window.DPAnimate.scrollTrigger('.row.animate', {
        start: 'top bottom-=100px',
        end: 'bottom top+=150px',
        // once: false,
        onEnter: onEnter,
        onEnterBack: onEnter,
    });
})