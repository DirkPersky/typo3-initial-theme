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
    return true;
    var headerSlider = document.querySelectorAll('.carousel')
    AnimationStagger = 0.02,
        AnimationTarget = '.carousel-caption p';
    // loop sliders
    headerSlider.forEach(slider => {
        var items = slider.querySelectorAll('.carousel-inner .carousel-item'),
            carousel = new bootstrap.Carousel(slider);
        // transition delay
        items.forEach((e, i) => {
            // // items to animate
            var items = e.querySelectorAll(AnimationTarget);
            // set new Delay for item
            e.style.transitionDelay = (AnimationStagger * (items.length + 1) + 0.6)+'s';
        });
        // bind out trigger
        slider.addEventListener('slide.bs.carousel', (event) => {
            // items to animate
            var items = slider.querySelector('.carousel-inner .carousel-item.active').querySelectorAll(AnimationTarget);
            // out animation
            onLeave(items);
        });
        // bind in trigger
        slider.addEventListener('slid.bs.carousel', (event) => {
            carousel.pause();
            carousel.cycle();
            // items to animate
            var items = event.relatedTarget.querySelectorAll(AnimationTarget);
            // start in animation
            onEnter(items);
        });
        // on enter animation
        function onEnter(element) {
            // inimate Text
            window.DPAnimate.animate(element, {
                class: 'animated fadeInRight',
                stagger: AnimationStagger,
                onItemComplete: e => e.style.visibility = 'visible'
            });
        }
        // out enter animation
        function onLeave(element) {
            // inimate Text
            window.DPAnimate.animate(element, {
                class: 'animated fadeOutDown',
                stagger: AnimationStagger,
                onItemComplete: e => e.style.visibility = 'hidden'
            });
        }
    });
});