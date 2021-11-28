/*
 * Copyright (c) 2021.
 *
 * @category TYPO3
 *
 * @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */
jQuery(function ($) {
    // init swup
    window.swupLoad = new Swup({
        cache: false,
        debugMode: true,
        plugins: [
            new SwupOverlayTheme(),
            new SwupFormsPlugin({formSelector: 'form'})
        ]
    });
    // call Statemanager
    window.swupLoad.on('contentReplaced', function () {
        window.StateManager.call();
    });
});



