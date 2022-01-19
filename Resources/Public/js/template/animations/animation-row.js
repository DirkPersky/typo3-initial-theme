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
        $element.find('> div:not(:first-child)').addClass('animated bounceInRight');
        // animation def
        sliderText.chars.map((e, i) => {
            e.classList.add('animated');
            e.classList.add('textBounceLeft');
            e.style.animationDelay = (0.02 * i) + "s";
        })
        // // complete callback
        // timeLine.then(e => {
        //     sliderText.revert(); // rese to normal text
        // });
    }

    $trigger = window.DPAnimate.scrollTrigger('.row.animate', {
        start: 'top bottom-=100px',
        end: 'bottom top+=100px',
        // once: false,
        onEnter: onEnter,
        onEnterBack: onEnter,
    });
})