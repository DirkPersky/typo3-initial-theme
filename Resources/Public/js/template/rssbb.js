/*
 * Copyright (c) 2021.
 *
 * @category TYPO3
 *
 * @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */

/*!
 Ridiculously Responsive Social Sharing Buttons
 Team: @dbox, @joshuatuscan
 Site: http://www.rrssb.ml
 Twitter: @therealkni
        ___           ___
       /__/|         /__/\        ___
      |  |:|         \  \:\      /  /\
      |  |:|          \  \:\    /  /:/
    __|  |:|      _____\__\:\  /__/::\
   /__/\_|:|____ /__/::::::::\ \__\/\:\__
   \  \:\/:::::/ \  \:\~~\~~\/    \  \:\/\
    \  \::/~~~~   \  \:\  ~~~      \__\::/
     \  \:\        \  \:\          /__/:/
      \  \:\        \  \:\         \__\/
       \__\/         \__\/
*/

(function(window, DPsocialButtons) {
    // stop from running again, if accidently included more than once.
    if (typeof DPsocialButtons.hasInitialised != 'undefined') return
    // popup function
    DPsocialButtons.popupCenter = function(url, title, w, h) {
        // Fixes dual-screen position                         Most browsers      Firefox
        var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
        var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        var left = ((width / 2) - (w / 2)) + dualScreenLeft;
        var top = ((height / 3) - (h / 3)) + dualScreenTop;

        var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

        // Puts focus on the newWindow
        if (newWindow && newWindow.focus) {
            newWindow.focus();
        }
    };
    // init load
    window.addEventListener('DOMContentLoaded', () => {
        try {
            jQuery(document).on('click', '.rrssb-buttons a.popup', function(e){
                var self = jQuery(this);
                DPsocialButtons.popupCenter(self.attr('href'), self.find('.rrssb-text').html(), 580, 470);
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
            });

            jQuery(document).on('click', 'div[data-share]', function(e){
                var self = jQuery(this);
                if( self.hasClass('popup') ){
                    DPsocialButtons.popupCenter(self.data('share'), self.find('.rrssb-text').html(), 580, 470);
                } else {
                    window.location.href= self.data('share');
                }
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
            });
        }
        catch (e) { // catching this adds partial support for jQuery 1.3
        }
    }, false);

    // Make global
    window.DPsocialButtons = DPsocialButtons;
})(window, window.DPsocialButtons || {});
