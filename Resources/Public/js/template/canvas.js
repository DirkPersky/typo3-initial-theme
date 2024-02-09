/*
 * Copyright (c) 2023.
 *
 * @category TYPO3
 *
 * @copyright  2023 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */
class DPCanvas {

    constructor(element, options) {
        /**
         * Set Configuration Array
         */
        this.settings = Object.assign({
            type: 22,
            wrap: '<div class="canvas--menu"/>',
            backdrop: '.nav--backdrop'
        }, options);
        // container
        this.$button = element;
        this.$container = this.createElement(this.settings.wrap);
        // add data class
        if(typeof this.$button.dataset['dpCanvis'] != 'undefined') this.$container.classList.add(this.$button.dataset['dpCanvis']);
        // at wrapper to body
        document.body.append(this.$container);

        this.$toggleButtonCallback = this.eventToogleButton.bind(this);
        this.$eventBackdropCallback = this.eventBackdrop.bind(this);

        // Initial Load Content
        this.loadNavigationContent();
        // bind external triggers
        this.bindTriggers();
    }


    /**
     * Reinit Triggers
     */
    bindTriggers(){
        this.$button.addEventListener('dp--canvas', () => {
            // Initial Load Content
            this.loadNavigationContent();
            // close events
            document.querySelector(this.settings.backdrop).click();
        });
    }

    createElement(html){
        return new DOMParser().parseFromString(html, 'text/html').body.childNodes[0];
    }

    loadNavigationContent(){
        var current = window.location.protocol+'//' + window.location.hostname + window.location.pathname;
        current = current.replace(/\/$/g, '');
        // make Ajax Request
        fetch(current + '?' + new URLSearchParams({
            type: this.settings.type
        })).then(response => response.text()).then( (data) => {
            this.$container.innerHTML = data;
            // add Bindings
            this.linkBindings();
            // add Toggle Button now
            this.toggleButtonEvents();
            // sync action
            this.syncNav();
        }, function (error){ });
    }

    linkBindings(){
        // Add CLick Bindings
        var btns = this.$container.querySelectorAll('.trigger'),
            headers = this.$container.querySelectorAll('.list-header');

        btns.forEach(btn => {
            btn.addEventListener('click', this.eventTriggerBtn.bind(this));
            var parent = btn.parentElement;
            if(parent.classList.contains('item--spacer')) parent.addEventListener('click', this.eventTriggerBtn.bind(this));
        });

        headers.forEach(header => {
            header.addEventListener('click', this.eventListHeader.bind(this));
        });
    }
    eventTriggerBtn(e){
        e.preventDefault();
        e.stopPropagation();
        // get Parent Droddown
        e.target.closest('.dropdown').querySelector('.dropdown-wrap').classList.add('show');
    }
    eventListHeader(e){
        e.preventDefault();
        e.stopPropagation();
        // get Parent Droddown
        e.target.closest('.dropdown').querySelector('.dropdown-wrap').classList.remove('show');
    }
    /**
     * Toggle button Events
     */
    toggleButtonEvents(){
        // close event on Backdropclick
        var backdrop = document.querySelector(this.settings.backdrop);
        backdrop.removeEventListener('click', this.$eventBackdropCallback);
        backdrop.addEventListener('click', this.$eventBackdropCallback);
        // bind button click
        this.$button.removeEventListener('click',  this.$toggleButtonCallback);
        this.$button.addEventListener('click',  this.$toggleButtonCallback);
        // remove disable attribute
        this.$button.removeAttribute('disabled');
    }
    eventBackdrop(){
        document.documentElement.classList.remove('nav--open');
        this.$button.classList.remove('is-active');
    }
    eventToogleButton(){
        document.documentElement.classList.toggle('nav--open');
        this.$button.classList.toggle('is-active');
    }

    /**
     * Sync Main Action
     */
    syncNav(){
        var $syncTarget = this.$button.dataset['sync'];
        if($syncTarget && ($syncTarget = document.querySelector($syncTarget))) {
            $syncTarget.innerHTML = '';
            $syncTarget.append(this.$container.querySelector('.navbar-nav').cloneNode(true));
            $syncTarget.querySelectorAll('.list-header').forEach(e => {
                e.removeEventListener('click', this.eventListHeader.bind(this))
            });
            $syncTarget.querySelectorAll('.trigger').forEach(e => {
                var parent = e.parentElement;
                if(parent.classList.contains('item--spacer')) parent.removeEventListener('click', this.eventTriggerBtn.bind(this));
            });
        }

        window.StateManager.callByName('custom-cursor');
    }
}

window.addEventListener('DOMContentLoaded', (e) => {
    document.querySelectorAll('[data-dp-canvis]').forEach( e => new DPCanvas(e));
});

// init realod
window.StateManager.attach('dp--canvas', function () {
    document.querySelector('[data-dp-canvis]').dispatchEvent( new Event('dp--canvas'));
});