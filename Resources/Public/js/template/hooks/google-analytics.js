/*
 * Copyright (c) 2021.
 *
 * @category TYPO3
 *
 * @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */

/**
 * Update Analytics on Swup Reload
 */
window.StateManager.attach('analytics-update', function () {
    if (typeof window.dataLayer != 'function' && typeof window.dataLayer != 'undefined') {
        window.dataLayer.some(set => {
            if (set[0] == 'config') {
                var config = set[2];
                config.page_title = document.title;
                config.page_path = (window.location.href).replace(window.location.origin, '').toLowerCase();

                gtag('js', new Date());
                gtag(set[0], set[1], config);
                return true;
            }
        });
    }
});
