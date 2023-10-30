/*
 * Copyright (c) 2021.
 *
 * @category TYPO3
 *
 * @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */
const _DIR_ = process.argv.slice(2);
// load packages
const fs = require('fs');
const copy = require('recursive-copy');

const _PACKGES_ = [
    {
        'vendor': 'js/vendor/',
        'src': [
            // {src: '@fancyapps/fancybox/dist/jquery.fancybox.min.js'},
            {src: 'bootstrap/dist/js/bootstrap.min.js'},
            {src: 'bootstrap/dist/js/bootstrap.min.js.map'},
            // {src: 'jquery/dist/jquery.min.js'},
            // {src: 'jquery/dist/jquery.min.map'},
            {src: 'bs5-lightbox/dist/index.bundle.min.js'},
            {src: 'bs5-lightbox/dist/index.bundle.min.js.map'},
            {src: 'umbrellajs/umbrella.min.js'},
            // {src: 'rrssb/js/rrssb.min.js'},
            {src: 'jarallax/dist/jarallax.min.js'},
            {src: 'jarallax/dist/jarallax.min.js.map'},

            /**
             * Swup
             */
            {src: 'swup/dist/swup.umd.js', dir: 'swup'},
            {src: 'swup/dist/swup.umd.js.map', dir: 'swup'},

            {src: '@swup/overlay-theme/dist/index.umd.js', dir: 'swup/plugin/overlay', name: 'SwupOverlayTheme.js'},
            {src: '@swup/overlay-theme/dist/index.umd.js.map', dir: 'swup/plugin/overlay'},

            {src: '@swup/forms-plugin/dist/index.umd.js', dir: 'swup/plugin/forms', name: 'SwupForms.js'},
            {src: '@swup/forms-plugin/dist/index.umd.js.map', dir: 'swup/plugin/forms'},
            {src: '@swup/scroll-plugin/dist/index.umd.js', dir: 'swup/plugin/scroll', name: 'SwupScroll.js'},
            {src: '@swup/scroll-plugin/dist/index.umd.js.map', dir: 'swup/plugin/scroll'},

            /**
             * SplitText
             */
            {src: 'split-type/umd/index.min.js', name: 'SplitType.js'},
        ]
    },
    {
        'vendor': 'scss/vendor/',
        'src': [
            // '@fancyapps/fancybox/dist/jquery.fancybox.min.css',
            '@fortawesome/fontawesome-free/scss',
            'bootstrap/scss',
            'hamburgers/_sass',
        ]
    },
    {
        'vendor': 'assets/vendor/',
        'src': [
            '@fortawesome/fontawesome-free/webfonts',
            'rrssb/icons'
        ]
    }
];

_PACKGES_.map((package) => {
    package.src.map((src) => {
        // dir extend
        let _subDir = false;
        let _rename = false;
        // modify
        if (typeof src == 'object') {
            // is is array
            if (typeof src['name'] != 'undefined') _rename = src['name'];
            if (typeof src['dir'] != 'undefined') _subDir = src['dir'];
            src = src['src'];
        }
        // build src path
        let from = 'node_modules/' + src;
        // build dest path
        let dest = package.vendor;
        // Split src to get vendor name
        let split = src.split('/');
        // add sub path
        if (_subDir) {
            dest += _subDir + '/';
        } else {
            dest += split[0] + '/';
        }
        // is filename
        if (fs.existsSync(from) && fs.lstatSync(from).isFile()) {
            // add file name do dest
            let name = split.pop();
            var fileExt = name.split('.').pop();
            if (fileExt == 'css') {
                name = name.replace('.css', '.scss');
            }
            // change name if set
            if (_rename) name = _rename; // not Working
            // add to dest
            dest += name;
        }
        // public dir
        if (typeof _DIR_ != 'undefined' && _DIR_.length > 0) dest = _DIR_ + '/' + dest;
        //copy now
        copy(from, dest, {
            overwrite: true,
        }, function (error, results) {
            if (error) {
                console.error('Copy failed: ' + error);
            } else {
                console.info('Copied ' + results.length + ' files');
            }
        });

    });
})