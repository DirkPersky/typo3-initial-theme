/*
 * Copyright (c) 2021.
 *
 * @category TYPO3
 *
 * @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */

const penthouse = require('penthouse');
const request = require('request');
const CleanCSS = require('clean-css');
const fs = require('fs');

/**
 * Parsing URL
 * @type {string[]}
 */
const urls = [
    'https://dp-wired.de/'
];
/**
 * CSS LIVE URL
 * @type {string}
 */
const CSS_URL = '##REMOTE_CSS_LINK###';
/** urls for Mobile **/
const mobileUrls = [
    ...urls
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
    mobile: _DIR_ + '/assets/abovethefold-xs.css',
    desktop: _DIR_ + '/assets/abovethefold.css'
};
/**
 * LOAD Remove CSS FILE
 */
request(CSS_URL, (error, response, CSS_STRING) => {
    /**
     * Above The Fild Config
     * @type {{css: string, width: number, height: number, propertiesToRemove: string[]}}
     */
    const penthouseOptions = {
        cssString: CSS_STRING,

        width: 1300,  // viewport width
        height: 900,  // viewport height

        propertiesToRemove: [
            '(.*)transition(.*)',
            'cursor',
            'pointer-events',
            '(-webkit-)?tap-highlight-color',
            '(.*)user-select',
            'background-image',
            'content',
            'src'
        ],
    };

    /**
     * Above The fold Config for Mobile
     * @type {{css: string, width: number, height: number, propertiesToRemove: string[]}}
     */
    const penthouseMobileOptions = {
        ...penthouseOptions,

        width: 375,  // viewport width
        height: 667,  // viewport height
    };
    /**
     * CSS Optimierung
     * @type {{level: {"1": {all: boolean}, "2": {all: boolean}}, inline: string[], fetch: CSSOptions.fetch}}
     */
    const CSSOptions = {
        level: {
            1: {all: true},
            2: {all: true}
        },
        inline: ['all'],
        fetch: function (uri, inlineRequest, inlineTimeout, callback) {
            // remove all @Imports
            callback(null, '');
        }
    };
    /**
     * CSS Temp store
     * @type {{mobile: Array, desktop: Array}}
     */
    let CSS = {
        mobile: [],
        desktop: []
    };
// recursively generates critical css for one url at the time,
// until all urls have been handled
    function startNewJob(options, _urls, key) {
        const url = _urls.pop(); // NOTE: mutates urls array
        if (!url) {
            // no more new jobs to process (might still be jobs currently in process)
            return Promise.resolve()
        }
        // run penthouse
        return penthouse({
            url,
            ...options
        })
            .then(criticalCss => {
                // do something with your criticalCSS here!
                CSS[key].push(criticalCss);
                // Then call to see if there are more jobs to process
                return startNewJob(options, _urls, key)
            })
    }

    /**
     * Run Mobile CSS
     */
    Promise.all([
        // Start Desktop Jobs
        startNewJob(penthouseOptions, urls, 'desktop'),
        // Start Mobile Jobs
        startNewJob(penthouseMobileOptions, mobileUrls, 'mobile'),
    ]).then(() => {
        // Create Desktop CSS
        new CleanCSS(CSSOptions).minify(CSS.desktop.join(''), function (error, output) {
            fs.writeFileSync(outFiles.desktop, '/*Desktop*/' + output.styles + '\n.container::after,.row:after {content:"";display: table;clear: both;}');
        });
        // Create Mobile CSS
        new CleanCSS(CSSOptions).minify(CSS.mobile.join(''), function (error, output) {
            fs.writeFileSync(outFiles.mobile, '/*Mobile*/' + output.styles + '\n.container::after,.row:after {content:"";display: table;clear: both;}');
        });
    });

});
