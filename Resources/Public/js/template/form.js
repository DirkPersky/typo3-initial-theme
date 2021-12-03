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
$.fn.typo3form = function(options){
    /**
     * Set Configuration Array
     */
    var settings = $.extend({

    }, options);
    // loop forms
    this.map(function (index, element) {
        var form = $(element),
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
            var formData = new FormData(form[0]);
            // add next page flag
            formData.set(btn.prop('name'), btn.prop('value'));
            // disable Fieldset
            form.find('fieldset').attr('disabled','disabled');
            // perform request
            window.swupLoad.loadPage({
                url: form.data('ajax-form'), // route of request (defaults to current url)
                method: 'POST', // method of request (defaults to "GET")
                data: formData, // data passed into XMLHttpRequest send method
            });
        }


    });
};

window.StateManager.attach('forms', function () {
    jQuery('form[data-ajax-form]').typo3form();
});
