/*
 * Copyright (c) 2021.
 *
 * @category TYPO3
 *
 * @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */

u.prototype.searchLoading = function (options) {
    /**
     * Set Configuration Array
     */
    var settings = Object.assign({
        type: 9718,
        clearHTML: true,
        submitSelector: 'a',
        formSelector: '[form-input]',
        inputSelector: '#tx-indexedsearch-searchbox-sword',
        parentFormSelector: '#tx_indexedsearch',
        onError: null,
        onSuccess: null,
    }, options);
    u(this).each( element => {
        /**
         * Loop Over Elements
         */
        var parent = u(element),
            submitBtn = parent.find(settings.submitSelector),
            href = parent.data('href'),
            targetContainer = parent.find(settings.formSelector),
            ajaxTimer = null;

        // Load Form from URL
        clearTimeout(ajaxTimer);
        ajaxTimer = setTimeout(function () {
            // Call Ajax
            fetch(href + '?' + new URLSearchParams({
                type: settings.type
            })).then(response => response.text())
                .then(function(data)  {
                // Get Ajax Table
                var targetTable = u(data).find(settings.parentFormSelector);
                // Call Success Handling
                onSucces(targetTable);
            },function(status)  {
                // Errot Handling bind link to Seach Form
                onError();
            });
        }, 50);

        /**
         * Global Functions
         */
        function onSucces(content) {
            // get Input
            var input = content.find(settings.inputSelector);
            // Clear Index Search HTMl
            if (settings.clearHTML) {
                // move Submit Button
                var submit = content.find('.tx-indexedsearch-search-submit');
                submit.addClass('d-none');
                content.append(submit);
                // append Input to Form
                content.append(input);
                // add Focus bar after Input
                content.append('<div class="focus-bar"/>');
                // Remove Fieldset
                content.find('fieldset').remove();
            }
            // clear & remove IDS
            content.attr({id: 'ajax-form-loaded'});
            content.find('input').attr({id: null});
            content.find('select').attr({id: null});
            // Write to HTMl
            targetContainer.append(
                content
            );
            // Add Class to Form for Animatio
            setTimeout(function () {
                targetContainer.addClass('show');
            }, 50);
            // Bind Submit
            submitBtn.on('click', function (e) {
                e.preventDefault();
                // Submit form now
                content.submit();
            });
            // call Success Handling
            if (settings.onSuccess) {
                settings.onSuccess(parent, content);
            }
        }

        /**
         * On Error Link to Form on Button Click
         */
        function onError() {
            submitBtn.on('click', function (e) {
                e.preventDefault();
                // ridirect now
                window.location = href;
            });
            // call Error Handling
            if (settings.onError) {
                settings.onError(parent);
            }
        }
    });
};

window.addEventListener('DOMContentLoaded', () => {
    /**
     * Bind Dynamic Searchform Loadind to Element
     */
    u('[search-loading]').searchLoading({
        type: 9718,
        onError: function (element, href) {
            u('div[data-bs-target="#collapseSearch"]').on('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                window.location = href;
            });
        }
    });
});
