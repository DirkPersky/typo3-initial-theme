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
            {src: '@fancyapps/fancybox/dist/jquery.fancybox.min.js'},
            {src: 'bootstrap/dist/js/bootstrap.bundle.min.js'},
            {src: 'bootstrap/dist/js/bootstrap.bundle.min.js.map'},
            {src: 'jquery/dist/jquery.min.js'},
            {src: 'jquery/dist/jquery.min.map'},
            {src: 'rrssb/js/rrssb.min.js'},

            /**
             * Responsive Images
             */
            {src: 'lazysizes/lazysizes.min.js'},
            {src: 'lazysizes/plugins/print/ls.print.js', dir: 'lazysizes/plugin'}, // LazyLoading for Print
            {src: 'lazysizes/plugins/respimg/ls.respimg.js', dir: 'lazysizes/plugin'}, // LazyLoading for Responsive Images
            {src: 'lazysizes/plugins/bgset/ls.bgset.js', dir: 'lazysizes/plugin'}, // LazyLoading for Background-Images

            /**
             * Swup
             */
            {src: 'swup/dist/swup.js', dir: 'swup'},
            {src: '@swup/overlay-theme/dist/SwupOverlayTheme.js', dir: 'swup/plugin'},
            {src: '@swup/forms-plugin/dist/SwupFormsPlugin.js', dir: 'swup/plugin'},
            {src: '@swup/scroll-plugin/dist/SwupScrollPlugin.js', dir: 'swup/plugin'},

            /**
             * GSAP
             */
            {src: 'gsap/dist/gsap.js', dir: 'gasp'}, // gsap
            {src: 'gsap/dist/ScrollTrigger.js', dir: 'gasp/plugin', name: 'ScrollTrigger.js'}, // GSAP Plugins
            {src: 'split-type/umd/index.min.js', dir: 'gasp/plugin', name: 'SplitType.js'},
            // {src: 'gsap/dist/PixiPlugin.js',                   dir: 'gasp/plugin', name: 'PixiPlugin.js'}, // GSAP Plugins
            // {src: 'three/build/three.min.js',                  dir: 'gasp/module', name: 'three.min.js'}, // three.js
            // {src: 'hover-effect/dist/hover-effect.umd.js',     dir: 'gasp/hover-effekt', name: 'hover-effect.umd.js'}, // hover effect
            // {src: 'hover-effect/dist/hover-effect.umd.js.map', dir: 'gasp/hover-effekt'}, // hover effect
        ]
    },
    {
        'vendor': 'scss/vendor/',
        'src': [
            '@fancyapps/fancybox/dist/jquery.fancybox.min.css',
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