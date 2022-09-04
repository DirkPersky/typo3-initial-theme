/*
 * Copyright (c) 2021.
 *
 * @category TYPO3
 *
 * @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */

window.addEventListener('DOMContentLoaded', () => {
    u('#canvas-sync').off('click').on('click', '.list-header', (e) => {
        var parent = u(e.target).closest('.dropdown-wrap');
        parent.addClass('d-none');
        setTimeout(() => {
            parent.removeClass('d-none');
        }, 50);
    });
});

