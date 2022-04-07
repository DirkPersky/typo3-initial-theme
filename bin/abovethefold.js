/*
 * Copyright (c) 2021.
 *
 * @category TYPO3
 *
 * @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */
const fs = require('fs');

/**
 * Parsing URL
 * @type {string[]}
 */
const _URLS_ = [
    'URL1',
];
/**
 * @private
 */
const _DIR_ = process.argv.slice(2);
/**
 * Path where css will be saved
 * @type {{mobile: string, desktop: string}}
 */
const outFiles = {
    above: _DIR_ + '/assets/abovethefold.css',
    // rest: _DIR_ + '/assets/main.css'
};
/**
 * LOAD Remove CSS FILE
 */
(async () => {
    const Crittr = require("crittr");
    try {
        const { critical, rest } = await Crittr({
            urls: _URLS_,
            outputRemainingCss: false,
            device: {
                width:  1920,
                height: 1080
            }
        });

        fs.writeFileSync(outFiles.above, critical);
        // fs.writeFileSync(outFiles.rest, rest);
    } catch (err) {
        console.error('Removed @Support inside @media in Fancybox??');
    }
})();