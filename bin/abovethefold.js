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
    'https://dp-wired.de/',
    'https://dp-wired.de/leistungen/ecommerce-mit-shopware',
    'https://dp-wired.de/lebenslauf'
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
    rest: _DIR_ + '/assets/main.css'
};
/**
 * LOAD Remove CSS FILE
 */
(async () => {
    const Crittr = require("crittr");
    try {
        const { critical, rest } = await Crittr({
            urls: _URLS_,
            // outputRemainingCss: false,
            removeSelectors: [
                '.dp--revoke%',
                '.cc-%',
                '.swup%'
            ],
            keepSelectors: [
                '.btn',
                '.btn%',
                '%-xs',
                '%-sm',
                '%-md',
                '%-lg',
                '%-xl',
                '%-xxl',
                '.col-%',
                '.pt-%',
                '.pb-%',
                '.ps-%',
                '.pe-%',
                '.mt-%',
                '.mb-%',
                '.me-%',
                '.ms-%',
                '%-sm-%',
                '%-md-%',
                '%-lg-%',
                '%-xl-%',
                '%-xxl-%',
                '.frame-space-%',
                '.css-space-%',
            ],
            device: {
                width:  1920,
                height: 1080
            },
            browser: {
                userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36(KHTML, like Gecko) Chrome/61.0.3116.0 Safari/537.36 Chrome-Lighthouse',
            }
        });

        fs.writeFileSync(outFiles.above, critical);
        // fs.writeFileSync(outFiles.rest, rest);
    } catch (err) {
        console.error('Removed @Support inside @media in Fancybox??');
    }
})();