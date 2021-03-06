/*
 * Copyright (c) 2021.
 *
 * @category TYPO3
 *
 * @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */

jQuery.fn.NewsAjaxScrollPaging = function (options) {
    /**
     * Set Configuration Array
     */
    var settings = $.extend({
        next: {
            class_current: 'current left',
            class_new: 'next',
            class_form: 'sending',

            submit: true
        },
        prev: {
            class_current: 'current right',
            class_new: 'prev',
            class_form: 'revert',

            submit: false
        }
    }, options);
    /**
     * Loop data
     */
    this.map(function (index, element) {
        var $el = jQuery(element),
            $url = $el.data('news-next');
        // remove Content
        $el.html('');
        // mark as loaded
        $el.removeAttr('data-news-next');
        element.classList.add('news-loading');

        const $waypoint = window.DPAnimate.scrollTrigger(element, {
            start: 'top bottom-=100px',
            onEnter: (e) => {
                loadPage($el);
            },
        });

        function loadPage($el) {
            // ajax request next page
            var response = jQuery.get({
                url: $url,
                cache: true
            });
            // handle Response
            response.then(function (data) {
                // destroy old binding
                $waypoint.kill();
                // find news list
                var _html = jQuery(data);
                // find parent id
                var _id = $el.parents('.news-list-view')[0].id;
                // replace content
                var _children = _html.find('#' + _id).children();
                // paging
                var _paging = _html.closest('div[data-news-next]');
                // replace
                _children.insertAfter($el);
                // remove old element
                $el.remove();
                // run scripts
                window.StateManager.callByName('animate-trigger');
                window.StateManager.callByName('news-paging');
            }, function (error) {
            });
        }
    });
};

jQuery.fn.isInViewport = function () {
    var elementTop = jQuery(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = jQuery(window).scrollTop();
    var viewportBottom = viewportTop + jQuery(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

jQuery.fn.NewsAjaxPaging = function (options){
    /**
     * Set Configuration Array
     */
    var settings = $.extend({
        parent: '.news-list-view',
        links: 'a'
    }, options);
    /**
     * Loop data
     */
    this.map(function (index, element) {
        var $el = jQuery(element),
            $links = $el.find(settings.links);

        $links.on('click', e => {
            e.preventDefault();
            e.stopPropagation();

            loadPage(e);
        })

        function loadPage(e) {
            var _parent = $el.parents(settings.parent)[0];
            _parent.classList.add('is--loading');
            // ajax request next page
            var response = jQuery.get({
                url: e.delegateTarget.href,
                cache: true
            });
            // handle Response
            response.then(function (data) {
                // find parent id
                var _id = _parent.id;
                // find replace content
                var _html = jQuery(data),
                    _children = _html.find('#' + _id);
                // replace
                _children.insertAfter(_parent);
                // remove old element
                _parent.remove();
                // run scripts
                window.StateManager.callByName('animate-trigger');
                window.StateManager.callByName('news-paging');
            }, function (error) {
                _parent.classList.remove('is--loading');
            });
        }
    });
}
window.StateManager.attach('news-paging', function () {
    $('div[data-news-next]').NewsAjaxScrollPaging();
    $('.news-list-view .pagination').NewsAjaxPaging();
});
