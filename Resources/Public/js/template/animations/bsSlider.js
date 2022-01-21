/*
 * Copyright (c) 2021.
 *
 * @category TYPO3
 *
 * @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */

window.AnimateManager.attach('bsSlider', function () {
    return; // disable for the moment
    var headerSlider = document.querySelectorAll('.carousel');
    // loop sliders
    headerSlider.forEach(slider => {
        var items = slider.querySelectorAll('.carousel-inner .carousel-item'),
            carousel = new bootstrap.Carousel(slider);
        // transition delay
        items.forEach((e, i) => {
            e.style.transitionDelay = '.6s';
        });
        // bind out trigger
        slider.addEventListener('slide.bs.carousel', (event) => {
            // out animation
            onLeave(slider.querySelectorAll('.carousel-inner .carousel-item.active .carousel-caption'));
            // prepare next item
            event.relatedTarget.querySelectorAll('.carousel-caption').forEach(e => e.style.visibility = 'hidden');
        });
        // bind in trigger
        slider.addEventListener('slid.bs.carousel', (event) => {
            carousel.pause();
            carousel.cycle();
            // start in animation
            onEnter(event.relatedTarget.querySelectorAll('.carousel-caption'));
        });

        // on enter animation
        function onEnter(element) {
            // remove visibilty of old element
            element.forEach(e => e.style.removeProperty('visibility'));
            // get left col Header
            var sliderText = new SplitType(element, {types: "words, chars"});
            // inimate Text
            window.DPAnimate.animate(sliderText.chars, {
                class: 'animated textBounceLeft',
                stagger: 0.02,
                onComplete: e => sliderText.revert()
            });
        }

        // out enter animation
        function onLeave(element) {
            // inimate Text
            window.DPAnimate.animate(element, {
                class: 'animated fadeOut',
                stagger: 0.02,
                onComplete: e => e.style.visibility = 'hidden'
            });
        }
    });
});