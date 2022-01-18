/*
 * Copyright (c) 2021.
 *
 * @category TYPO3
 *
 * @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */

window.GSAPManager.attach('slider-text', function () {
    $("section.slider .carousel-caption").map((i, element) => {
        var sliderText = new SplitType(element, {types: "words, chars"}),
            timeLine = gsap.timeline();
        // set perspetive
        gsap.set(element, {perspective: 400});
        // wait 1 sec befor stat animations
        timeLine.delay(1);
        // animation def
        timeLine.from(sliderText.chars, {
            duration: 0.6,
            scale: 4,
            autoAlpha: 0,
            rotationX: -180,
            transformOrigin: "100% 50%",
            ease: "back",
            stagger: 0.02
        });
        // complete callback
        timeLine.then(e => {
            sliderText.revert(); // rese to normal text
        })
    });
});