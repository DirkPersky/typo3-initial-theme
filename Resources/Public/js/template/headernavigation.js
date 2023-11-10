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
    document.querySelector('#canvas-sync').addEventListener('click', e => {
        if(e.target.classList.contains('list-header')){
            var parent = e.target.closest('.dropdown-wrap');
            parent.classList.add('d-none');
            setTimeout(() => {
                parent.classList.remove('d-none');
            }, 50);
        }
    })
});

