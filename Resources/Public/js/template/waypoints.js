/*
 * Copyright (c) 2021.
 *
 * @category TYPO3
 *
 * @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */

window.StateManager.attach('waypoints', function () {
    var items = jQuery('#c18 .ce-column, .frame-layout-7, .news-list-2 .article, .animate');
    if (items.length > 0) {
        // Destroy all before bind
        Waypoint.destroyAll();
        // rebind new
        items.waypoint(function (direction) {
            if (direction == 'down') {
                this.adapter.$element.addClass('animated-show')
            } else {
                this.adapter.$element.removeClass('animated-show')
            }
        }, {
            offset: '95%' // Way to top of Page
        });
    }
    // Waypoint.refreshAll();
});


