window.AnimateManager.attach('infinite-logo-scroll', function () {

    var elements = document.querySelectorAll('.frame-layout-15');

    elements.forEach(element => {
        var rows = element.querySelectorAll('.ce-row');

        rows.forEach(wrap => {
            var items = wrap.querySelectorAll('.ce-column'),
                wrapWidth = 0;

            items.forEach( item => {
                wrapWidth += item.offsetWidth;
            });

            wrap.style.setProperty('--animation-items-count', items.length);
            wrap.style.width = wrapWidth+'px';
            wrap.style.animationName = 'slideOutLeft';

            fillViewWithClones(items);
            window.addEventListener("resize", (event) => {
                fillViewWithClones(items);
            });

            /**
             * Clone to Avoid empty slots
             * @param items
             */
            function fillViewWithClones(items){
               var _wrapWidth = 0;
                wrap.querySelectorAll('.ce-column').forEach( item => {
                    _wrapWidth += item.offsetWidth;
                });

                while ((wrap.parentNode.offsetWidth * 2) > _wrapWidth) {
                    items.forEach( item => {
                        _wrapWidth += item.offsetWidth;

                        var clone = item.cloneNode(true);
                        clone.classList.add('clone');
                        item.parentNode.appendChild(clone);
                    });
                }
            }
        });
    });
});