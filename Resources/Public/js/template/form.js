/*
 * Copyright (c) 2021.
 *
 * @category TYPO3
 *
 * @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */

/**
 * Ajax Form Handling
 * @Author: Dirk Persky
 * @Date: 22.01.2020
 * @licence: MIT
 * @param options
 */
u.prototype.typo3form = function(options){
    return;
    /**
     * Set Configuration Array
     */
    var settings = Object.assign({

    }, options);
    // loop forms
    this.map(element => {
        var form = u(element),
            submit = form.find('[type="submit"]'),
            backwards = form.find('.btn-group.previous .btn');

        // go backwards
        backwards.on('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            formSubmit(backwards);
        });
        // go to next
        form.on('submit', (e) => {
            e.preventDefault();
            formSubmit(submit);
        });

        function formSubmit(btn) {
            var formData = new FormData(form.first());
            // add next page flag
            formData.set(btn.attr('name'), btn.attr('value'));
            // disable Fieldset
            form.find('fieldset').attr('disabled','disabled');
            // offset saver
            window.formScrollOffset = form.first().offsetTop;
            // handle SWUP Events
            if (typeof window.swupLoad != 'undefined'){
                // add scroll handler
                window.formScroll = function ($offset) {
                    window.swupLoad.scrollTo(window.formScrollOffset - $offset);
                    // clear handler
                    window.formScroll = undefined;
                    window.formScrollOffset = undefined;
                };
                // perform request
                window.swupLoad.navigate(form.data('ajax-form'), {
                    method: 'POST', // method of request (defaults to "GET")
                    data: formData, // data passed into XMLHttpRequest send method
                });
            } else {
                /**
                 * Handling Without SWUP
                 */
            }
        }
    });
};

window.StateManager.attach('forms', function () {
    u('form[data-ajax-form]').typo3form();
});
