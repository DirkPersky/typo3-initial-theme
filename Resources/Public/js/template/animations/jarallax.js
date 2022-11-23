/*
 * Copyright (c) 2021.
 *
 * @category TYPO3
 *
 * @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */
//
window.AnimateManager.attach('jarallax-effekts', function () {
    // get Slider image
    jarallax(document.querySelectorAll('.carousel .jarallax'), {});

    // init jarallax for css elements
    jarallax(document.querySelectorAll('.css--element.jarallax'), {
        onInit: function (e) {
            this.image.$container.classList.add('css-element-jarallax');
        }
    });
});