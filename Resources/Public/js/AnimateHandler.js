/*
 * Copyright (c) 2021.
 *
 * @category TYPO3
 *
 * @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */

(function (DPAnimate) {
    console.log(typeof DPAnimate.hasInitialised);
    // stop from running again, if accidently included more than once.
    if (typeof DPAnimate.hasInitialised != 'undefined') return;
    /**
     * define helper functions
     */
    var util = {
        /**
         * build Config object
         */
        deepExtend: function (target, source) {
            for (var prop in source) {
                if (source.hasOwnProperty(prop)) {
                    if (
                        prop in target &&
                        typeof target[prop] === 'object' &&
                        typeof source[prop] === 'object'
                    ) {
                        this.deepExtend(target[prop], source[prop]);
                    } else {
                        target[prop] = source[prop];
                    }
                }
            }
            return target;
        },
    };
    // bind to class
    DPAnimate.utils = util;
    // ad
    DPAnimate.scrollTrigger = function (options) {
        var defaultOptions = {};

        function ScrollTrigger(options) {
            // set options to default
            util.deepExtend((this.options = {}), defaultOptions);
            // merge in user options
            if (typeof options === 'object') util.deepExtend(this.options, options);


        }

        return new ScrollTrigger(options);
    };
    // mark as inet
    DPAnimate.hasInitialised = true;
})(window.DPAnimate || {});