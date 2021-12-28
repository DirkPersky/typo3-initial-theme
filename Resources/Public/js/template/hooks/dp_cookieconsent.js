/*
 * Copyright (c) 2021.
 *
 * @category TYPO3
 *
 * @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */

window.StateManager.attach('dp-cookieconsent-hooks', function () {
    /**
     * Bin Consent Handling for Content Elements
     */
    if (typeof window.DPCookieConsent != 'undefined' && window.DPCookieConsent.loaded) {
        // init overlays
        window.DPCookieConsent.Overlay.overlays();
        // start chouse handling
        window.DPCookieConsent.popup.execute();
    }
});
