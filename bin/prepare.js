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
            '@fancyapps/fancybox/dist/jquery.fancybox.min.js',
            'bootstrap/dist/js/bootstrap.bundle.min.js',
            'bootstrap/dist/js/bootstrap.bundle.min.js.map',
            'jquery/dist/jquery.min.js',
            'jquery/dist/jquery.min.map',
            'rrssb/js/rrssb.min.js',
            'lazysizes/lazysizes.min.js',
            'swup/dist/swup.js',
            '@swup/overlay-theme/dist/SwupOverlayTheme.js',
            '@swup/forms-plugin/dist/SwupFormsPlugin.js',
            '@swup/scroll-plugin/dist/SwupScrollPlugin.js',
            'waypoints/lib/jquery.waypoints.js', // Waypoint Scrolling
            ['waypoints/lib/shortcuts/infinite.js', 'shortcuts'], // Waypoint Scrolling Modules (infinite...)
            ['waypoints/lib/shortcuts/inview.js', 'shortcuts'], // Waypoint Scrolling Modules (inview...)
            ['waypoints/lib/shortcuts/sticky.js', 'shortcuts'], // Waypoint Scrolling Modules (sticky...)
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
        // is is array
        if(typeof src != 'string'){
            _subDir = src[1];
            src = src[0];
        }
        // build src path
        let  from = 'node_modules/' + src;
        // build dest path
        let  dest = package.vendor;
        // Split src to get vendor name
        let  split = src.split('/');
        // add to des path
        dest += split[0]+'/';
        // add sub path
        if(_subDir){
            dest += _subDir+'/';
        }
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
        // public dir
        if(typeof _DIR_ != 'undefined' && _DIR_.length > 0) dest = _DIR_+'/'+dest;
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