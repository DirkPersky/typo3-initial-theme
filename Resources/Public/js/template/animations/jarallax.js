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
    u('[data-parallax]').map(e => {
        // get selector
        var dataSelector = e.dataset.parallax;
        // remove datset
        delete e.dataset.parallax;
        // prepare for jarallax
        e.querySelectorAll(dataSelector).forEach(item => {
            item.classList.add('jarallax');
            item.querySelectorAll('img').forEach(img => {
                img.classList.add('jarallax-img');
            });
            // init jarallax for item
            jarallax(item, {});
        });
    });

    // init jarallax for css elements
    jarallax(document.querySelectorAll('.css--element.jarallax'), {
        onInit: function (e) {
            this.image.$container.classList.add('css-element-jarallax');
        }
    });
});