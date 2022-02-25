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
            if( key.indexOf('animate-') != -1){
                // inimate Text
                window.DPAnimate.animate(element, {
                    class: key.replace('animate-', 'animated '),
                    stagger: 0.02,
                    delay: .3
                });
            }
        });
    }
    window.DPAnimate.scrollTrigger('div[class*="animate-"]', {
        start: 'top bottom-=50px',
        end: 'bottom top+=150px',
        once: true,
        onEnter: onEnterCustom,
        onEnterBack: onEnterCustom,
    });
})