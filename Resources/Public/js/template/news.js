/*
 * Copyright (c) 2021.
 *
 * @category TYPO3
 *
 * @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */

u.prototype.NewsAjaxScrollPaging = function (options) {
    /**
     * Set Configuration Array
     */
    var settings = Object.assign({
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
    this.map(element => {
        var $el = u(element),
            $url = $el.data('news-next');
        // remove Content
        $el.html('');
        // mark as loaded
        $el.attr({'data-news-next': null});
        element.classList.add('news-loading');

        const $waypoint = window.DPAnimate.scrollTrigger(element, {
            start: 'top bottom-=100px',
            onEnter: (e) => {
                loadPage($el);
            },
        });

        function loadPage($el) {
            // ajax request next page
            fetch($url).then(response => response.text()).then(function (data) {
                // destroy old binding
                $waypoint.kill();
                // find news list
                var _html = u(data);
                // find parent id
                var _id = $el.closest('.news-list-view').first().id;
                // replace content
                var _children = _html.find('#' + _id).children();
                // replace
                $el.after(_children);
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
u.prototype.NewsAjaxPaging = function (options) {
    /**
     * Set Configuration Array
     */
    var settings = Object.assign({
        parent: '.news-list-view',
        links: 'a'
    }, options);
    /**
     * Loop data
     */
    this.map(element => {
        var $el = u(element),
            $links = $el.find(settings.links);

        $links.on('click', e => {
            e.preventDefault();
            e.stopPropagation();

            loadPage(e);
        })

        function loadPage(e) {
            var _parent = $el.closest(settings.parent).first();
            _parent.classList.add('is--loading');
            // ajax request next page
            fetch(e.delegateTarget.href).then(response => response.text()).then(function (data) {
                // find parent id
                var _id = _parent.id;
                // find replace content
                var _html = u(data),
                    _children = _html.find('#' + _id);
                // replace
                _parent.after(_children);
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
};

u.prototype.NewsSlider = function (options) {
    /**
     * Set Configuration Array
     */
    var settings = Object.assign({
        next: 'button.next',
        prev: 'button.prev'
    }, options);

    /**
     * Loop data
     */
    this.map(element => {
        var $el = u(element),
            $articles = $el.find('.article'),
            $next = $el.find(settings.next),
            $prev = $el.find(settings.prev),
            $pos = 0;
        /**
         * Set Initial View Classes
         */
        markPosition();
        /**
         * Resize Handler
         */
        window.addEventListener('resize', () => {
            markPosition();
        });

        $next.on('click', () => {
            $pos++;
            $articles.first().addEventListener('transitionend', eventTransitionEnd);
            element.style.setProperty("--wk-scroll", $pos);
            $prev.attr('disabled', true);
            $next.attr('disabled', true);
        });

        $prev.on('click', () => {
            $pos--;
            $articles.first().addEventListener('transitionend', eventTransitionEnd);
            element.style.setProperty("--wk-scroll", $pos);
            $prev.attr('disabled', true);
            $next.attr('disabled', true);
        });

        function eventTransitionEnd(){
            $articles.first().removeEventListener('transitionend', eventTransitionEnd );
            markPosition();
        }

        function markPosition() {
            $articles.removeClass('show');
            $prev.removeClass('show');
            $next.removeClass('show');

            $articles.map(function (article) {
                var setShowClass = true;
                if (parseInt(article.getBoundingClientRect().right - 10) <= parseInt(element.getBoundingClientRect().left)) {
                    setShowClass = false;
                    $prev.attr('disabled', false);
                    $prev.addClass('show');
                }
                if (parseInt(article.getBoundingClientRect().left + 10) >= parseInt(element.getBoundingClientRect().right)) {
                    setShowClass = false;
                    $next.attr('disabled', false);
                    $next.addClass('show');
                }
                if (setShowClass) article.classList.add('show');
            })
        }
    });
};
window.StateManager.attach('news-paging', function () {
    u('div[data-news-next]').NewsAjaxScrollPaging();
    u('.frame-layout-2 .news-list-view').NewsSlider();
    // u('.news-list-view .pagination').NewsAjaxPaging();
});
