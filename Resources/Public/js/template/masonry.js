window.StateManager.attach('masonry-image', function () {
    var masonry = document.querySelectorAll('.frame-layout-13');
    masonry.forEach( wrap => {
        var items = wrap.querySelectorAll('.ce-column');
        items.forEach( item => {
            // get class
            var sizeClass = item.querySelector('picture').classList;

            sizeClass.forEach(_class => {
                item.classList.add(_class);
            });
        });
    });
});