/*
 * Copyright (c) 2021.
 *
 * @category TYPO3
 *
 * @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */

(function () {
    var aboveTheFolds = document.querySelectorAll('style[data-abovethefold]');
    // remove elements
    aboveTheFolds.forEach((e, i) => {
        e.remove();
    });
})();