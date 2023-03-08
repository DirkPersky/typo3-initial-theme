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
    function onEnterCustom(element) {
        // disable if not desktop
        if(!window.matchMedia('(min-width: 768px)').matches) return;

        element.classList.forEach((key) => {
            if(key.indexOf('animate-textBounceLeft') != -1){
                // get left col Header
                var sliderText = new SplitType(element.querySelectorAll('header > *'), {types: "words, chars"});
                // inimate Text
                window.DPAnimate.animate(sliderText.chars, {
                    class: 'animated textBounceLeft',
                    stagger: 0.02,
                    delay: .3,
                    onComplete: e => sliderText.revert()
                });
            } else if( key.indexOf('animate-') != -1){
                // inimate Text
                window.DPAnimate.animate(element, {
                    class: key.replace('animate-', 'animated '),
                    stagger: 0.02,
                    delay: .3
                });
            }
        });
    }

    /**
     * init after initial scroll is done
     */
    var animationTimer =  startTimer();
    window.onscroll = function(ev) {
        if(animationTimer) {
            clearTimeout(animationTimer);
            animationTimer = startTimer();
        }
    };
    // start anyways after 1.5 secs
    setTimeout(() => {
        if(animationTimer) {
            clearTimeout(animationTimer);
            initAnimation();
        }
    }, 1500);
    function initAnimation(){
        animationTimer = false;
        window.DPAnimate.scrollTrigger('div[class*="animate-"]', {
            start: 'top bottom-=50px',
            end: 'bottom top+=150px',
            once: true,
            onEnter: onEnterCustom,
            onEnterBack: onEnterCustom,
        });
    }

    function startTimer(){
        return setTimeout(() => initAnimation(), 100);
    }
})