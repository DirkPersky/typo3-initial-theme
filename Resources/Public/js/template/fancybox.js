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
    /**
     * Fancybox
     */
    var classicLightbox = jQuery('.fancybox, a[rel="fancybox"]');
    classicLightbox.map((index, element) => {
        var el = jQuery(element),
            rel = el.attr('rel') || null;

        if (rel) el.attr('data-fancybox', rel);
    });
    classicLightbox.fancybox({
        buttons : [
            'close',
            'thumbs'
        ],
        thumbs : {
            autoStart : true
        },

        beforeClose: function(e){
            window.fancyStartClose = true;
        },
        afterClose: function (e){
            window.fancyStartClose = null;
        }
    });
    jQuery('.various, a[rel="various"]').fancybox({
        type: 'iframe',
    });
});