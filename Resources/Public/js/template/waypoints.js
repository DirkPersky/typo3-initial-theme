jQuery(function($){
    var items = jQuery('#c18 .ce-column, .frame-layout-7, .news-list-2 .article, .animate');
    if (items.length > 0) {

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
