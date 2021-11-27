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
const copy = require('recursive-copy');

const _PACKGES_ = [
    {
        'vendor': 'js/vendor/',
        'src': [
            '@barba/core/dist/barba.js',
            '@barba/core/dist/barba.js.map',
            '@fancyapps/fancybox/dist/jquery.fancybox.min.js',
            'popper.js/dist/popper.min.js',
            'popper.js/dist/popper.min.js.map',
            'bootstrap/dist/js/bootstrap.bundle.min.js',
            'bootstrap/dist/js/bootstrap.bundle.min.js.map',
            'jquery/dist/jquery.min.js',
            'jquery/dist/jquery.min.map',
            'rrssb/js/rrssb.min.js',
            'lazysizes/lazysizes.min.js',
            'waypoints/lib/jquery.waypoints.js', // Waypoint Scrolling
            'waypoints/lib/shortcuts/infinite.js', // Waypoint Scrolling Modules (infinite...)
            'waypoints/lib/shortcuts/inview.js', // Waypoint Scrolling Modules (inview...)
            'waypoints/lib/shortcuts/sticky.js', // Waypoint Scrolling Modules (sticky...)
        ]
    },
    {
        'vendor': 'scss/vendor/',
        'src': [
            '@fancyapps/fancybox/dist/jquery.fancybox.min.css',
            '@fortawesome/fontawesome-free/scss',
            'bootstrap/scss',
            'hamburgers/_sass',
            'rrssb/scss/rrssb.scss'
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
        // build src path
        let  from = 'node_modules/' + src;
        // build dest path
        let  dest = package.vendor;
        // Split src to get vendor name
        let  split = src.split('/');
        // add to des path
        dest += split[0]+'/';
        // is filename
        if(fs.existsSync(from) && fs.lstatSync(from).isFile()){
            // add file name do dest
            let name = split.pop();
            var fileExt = name.split('.').pop();
            if(fileExt == 'css'){
                name = name.replace('.css', '.scss');
            }
            // add to dest
            dest += name;
        }
        //copy now
        copy(from, dest, {
            overwrite: true,
        }, function(error, results) {
            if (error) {
                console.error('Copy failed: ' + error);
            } else {
                console.info('Copied ' + results.length + ' files');
            }
        });

    });
})