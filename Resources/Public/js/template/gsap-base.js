/*
 * Copyright (c) 2021.
 *
 * @category TYPO3
 *
 * @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */

// new Statemanager for GASP
window.GSAPManager = new _StateManager();
// attach to Statemanager
window.StateManager.attach('gsap-scrollTrigger', function () {
    // init GSAP Animations
    window.GSAPManager.call();
    // refersh for Swup relase
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 1000);
});