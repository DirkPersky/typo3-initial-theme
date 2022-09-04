/*
 * Copyright (c) 2021.
 *
 * @category TYPO3
 *
 * @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */
u.prototype.DPCanvas = function (options){
    /**
     * Set Configuration Array
     */
    var settings = Object.assign({
        type: 22,
        wrap: '<div class="canvas--menu"/>',
        backdrop: '.nav--backdrop'
    }, options);
    // container
    var $button = u(this),
        $container = u(settings.wrap);
    // add data class
    if($button.data('dp-canvis')) $container.addClass($button.data('dp-canvis'));
    // at wrapper to body
    u('body').append($container);
    // Initial Load Content
    loadNavigationContent();
    // bind trigger events
    bindTriggers();
    /**
     * Load Ajax Content from System
     */
    function loadNavigationContent(){
        var current = window.location.protocol+'//' + window.location.hostname + window.location.pathname;
        // make Ajax Request
        fetch(current + '?' + new URLSearchParams({
            type: settings.type
        })).then(response => response.text()).then(function (data){
            $container.html(data);
            // add Bindings
            linkBindings();
            // add Toggle Button now
            toggleButtonEvents();
            // sync action
            syncNav(data);
        }, function (error){ });
    }
    /**
     * Element Click Bindings
     */
    function linkBindings(){
        // Add CLick Bindings
        var btn = $container.find('.trigger'),
            header = $container.find('.list-header');
        // Bind Open Handler
        btn.on('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            // get Parent Droddown
            u(e.target).closest('.dropdown').find('.dropdown-wrap').first().classList.add('show');
        });
        // Bind Close Handler
        header.on('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            // get Parent Droddown
            u(e.target).closest('.dropdown').find('.dropdown-wrap').first().classList.remove('show');
        });
    }
    /**
     * Toggle button Events
     */
    function toggleButtonEvents(){
        // close event on Backdropclick
        u(settings.backdrop).off('click').on('click', () => {
            u('html').removeClass('nav--open');
            $button.removeClass('is-active');
        });
        // bind button click
        $button.off('click').on('click', () => {
            u('html').toggleClass('nav--open');
            $button.toggleClass('is-active');
        });
        // remove disable attribute
        $button.attr('disabled', null);
    }
    /**
     * Reinit Triggers
     */
    function bindTriggers(){
        $button.on('dp--canvas', () => {
            // Initial Load Content
            loadNavigationContent();
            // close events
            u(settings.backdrop).trigger('click');
        });
    }

    /**
     * Sync Main Action
     */
    function syncNav(data){
        var $syncTarget = $button.data('sync');
        if($syncTarget && ($syncTarget = u($syncTarget)).length > 0) {
            $syncTarget.html('');
            $syncTarget.append($container.find('.navbar-nav').clone());
            $syncTarget.find('.list-header').off('click');
        }
    }
};


window.addEventListener('DOMContentLoaded', (e) => {
    u('[data-dp-canvis]').DPCanvas();

    u('.nav-item.dropdown').on('mouseleave', function () {
        var dropdownList = u(this).find('.dropdown-wrap');
        dropdownList.removeClass('pull-right');
    });
});

// init realod
window.StateManager.attach('dp--canvas', function () {
    u('[data-dp-canvis]').trigger('dp--canvas');
});