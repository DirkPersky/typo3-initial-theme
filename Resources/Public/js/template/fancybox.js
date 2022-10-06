/*
 * Copyright (c) 2021.
 *
 * @category TYPO3
 *
 * @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */

window.StateManager.attach('fancybox', function () {
    const options = {
        keyboard: true
    };

    /**
     * Lightbox
     */
    var classicLightbox = u('.fancybox, a[rel="fancybox"]');
    classicLightbox.map(element => {
        var group = element.dataset.fancybox || null;
        if(group) element.dataset.gallery = group;
        element.dataset.toggle = 'lightbox';
        // has Caption?
        if(u(element).find('img').first())  element.dataset.caption = u(element).find('img').first().title;
        // bind click
        element.addEventListener('click', (e) => {
            e.preventDefault();
            // load lightbox
            const lightbox = new Lightbox(element, options);
            lightbox.show();
        })
    });

    var variousLightbox = u('.various, a[rel="various"]');
    variousLightbox.map(element => {
        var group = element.dataset.fancybox || null;
        if(group) element.dataset.gallery = group;
        element.dataset.toggle = 'lightbox';

        element.addEventListener('click', (e) => {
            e.preventDefault();
            const lightbox = new Lightbox(element, options);
            lightbox.show();
        })
    });
});