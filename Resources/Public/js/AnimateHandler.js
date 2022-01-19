/*
 * Copyright (c) 2021.
 *
 * @category TYPO3
 *
 * @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */

(function (DPAnimate) {
    // stop from running again, if accidently included more than once.
    if (typeof DPAnimate.hasInitialised != 'undefined') return

    // Custom Helper Function
    function DPNodeList() {
    }

    DPNodeList.prototype = Array.prototype;
    /**
     * define helper functions
     */
    var util = {
        /**
         * build Config object
         */
        deepExtend: function (target, source) {
            for (var prop in source) {
                if (source.hasOwnProperty(prop)) {
                    if (
                        prop in target &&
                        typeof target[prop] === 'object' &&
                        typeof source[prop] === 'object'
                    ) {
                        this.deepExtend(target[prop], source[prop]);
                    } else {
                        target[prop] = source[prop];
                    }
                }
            }
            return target;
        },
    };
    // bind to class
    DPAnimate.utils = util;
    var ScrollTriggerHandler = (function () {
        // trigger holder
        var triggers = [],
            lastScrollTop = 0,
            scrollDirection = 'down';
        // create scroll event subscriber
        window.addEventListener('scroll', function (_eScroll) {
            var st = window.pageYOffset || document.documentElement.scrollTop;
            // scoll direction
            if (st > lastScrollTop) scrollDirection = 'down';
            // upscroll code
            else scrollDirection = 'up';
            // update last scroll
            lastScrollTop = st <= 0 ? 0 : st;
            // loop triggers
            triggers.forEach(trigger => {
                callTrigger(trigger);
            });
        });

        /**
         * Init the Trigger
         * @param trigger
         */
        function callTrigger(trigger) {
            if (cleanProcessDOM(trigger)) return;
            // trigger events for element
            if (trigger.element instanceof DPNodeList) {
                trigger.element.forEach((element, i) => {
                    isCondition(element, trigger);
                })
            } else if (trigger.element instanceof HTMLDivElement) {
                isCondition(trigger.element, trigger);
            }
        }

        /**
         * Process Cleaner
         */
        function cleanProcessDOM(trigger) {
            // check if elements still exits in DOM
            if (trigger.element instanceof DPNodeList) {
                // shrink list if element is gone
                trigger.element = trigger.element.filter(element => {
                    if (document.body.contains(element)) return true;
                })
                // kill trigger while node List is Empty
                if (trigger.element.length == 0) {
                    trigger.kill();
                    return true;
                }
            } else if (trigger.element instanceof HTMLDivElement) {
                // if not exits in DOM abort Trigger
                if (!document.body.contains(trigger.element)) {
                    trigger.kill();
                    return true;
                }
            }
        }

        /**
         * check of waypoint
         * @param element
         * @param trigger
         */
        function isCondition(element, trigger) {
            // Start Event prepare
            var startTrigger = trigger.options.start.split(' ');
            var endTrigger = trigger.options.end.split(' ');
            // update values
            startTrigger[0] = replaceElementTriggerPosition(startTrigger[0], element);
            endTrigger[0] = replaceElementTriggerPosition(endTrigger[0], element);
            // get triggerpoint
            startTrigger[1] = replaceTriggerPosition(startTrigger[1], element);
            endTrigger[1] = replaceTriggerPosition(endTrigger[1], element);
            // prepare for Callbacks
            if (scrollDirection == 'down') {
                // onLeave callback
                if (isActive(element) && endTrigger[0] < endTrigger[1]) {
                    // unset active
                    if (trigger.options.once == false) unsetActive(element);
                    // run callback
                    var cbk = trigger.options.onLeave.bind(this);
                    cbk(element);
                }
                // onUpdateCallback
                if (isActive(element)) {
                    // run callback
                    var cbk = trigger.options.onUpdate.bind(this);
                    cbk(element);
                }
                // onEnter callback
                if (!isActive(element) && startTrigger[0] <= startTrigger[1] && endTrigger[0] >= endTrigger[1]) {
                    // set active
                    setActive(element);
                    // run callback
                    var cbk = trigger.options.onEnter.bind(this);
                    cbk(element);
                }
            } else {
                // onLeaveBack callback
                if (isActive(element) && startTrigger[0] > startTrigger[1]) {
                    // unset active
                    if (trigger.options.once == false) unsetActive(element);
                    // run callback
                    var cbk = trigger.options.onLeaveBack.bind(this);
                    cbk(element);
                }
                // onUpdateCallback
                if (isActive(element)) {
                    // run callback
                    var cbk = trigger.options.onUpdate.bind(this);
                    cbk(element);
                }
                // onEnterBack callback
                if (!isActive(element) && endTrigger[0] >= endTrigger[1] && startTrigger[0] < startTrigger[1]) {
                    // set active
                    setActive(element);
                    // run callback
                    var cbk = trigger.options.onEnterBack.bind(this);
                    cbk(element);
                }
            }
        }

        /**
         * get Animation status
         * @param element
         * @returns {boolean}
         */
        function isActive(element) {
            // if not defined or not right say inactive
            if (typeof element.dataset.dpAnimate == 'undefined' || element.dataset.dpAnimate != 1) return false
            return true;
        }

        /**
         * mark as active
         * @param element
         */
        function setActive(element) {
            element.dataset.dpAnimate = 1;
        }

        /**
         * mark as inaktive
         * @param element
         */
        function unsetActive(element) {
            element.dataset.dpAnimate = 0;
        }

        /**
         * get Trigger Point Position
         * @param triggerPos
         * @returns {*}
         */
        function replaceTriggerPosition(triggerPos) {
            var top = 0,
                bottom = window.innerHeight,
                center = bottom / 2;
            // prepace cals Math
            triggerPos = triggerPos.replace('top', top).replace('bottom', bottom).replace('center', center).replace('px', '').replace('=', '');
            // eval code
            triggerPos = eval.call(this, triggerPos);
            // return point of trigger
            return triggerPos;
        }

        /**
         * Element StartPoint Position to top of window
         * @param triggerPos
         * @param element
         * @returns {number}
         */
        function replaceElementTriggerPosition(triggerPos, element) {
            var eTop = element.getBoundingClientRect().top,
                eHeight = element.getBoundingClientRect().height,
                eButtom = element.getBoundingClientRect().bottom,
                eCenter = eTop + (eHeight / 2);
            // get pos
            switch (triggerPos) {
                case 'top':
                    return eTop;
                case 'center':
                    return eCenter;
                default:
                    return eButtom;
            }
        }

        /**
         * Public function
         */
        return {
            apply: function (trigger) {
                // add trigger to que
                triggers.push(trigger);
                // init active test
                callTrigger(trigger);
            },
            kill: function (trigger) {
                // find index
                var index = triggers.indexOf(trigger);
                // if index accepted
                if (index > -1) {
                    // remove from index
                    triggers.splice(index, 1);
                    return true;
                }
                return false;
            }
        }
    })();
    // add Public ScrollTrigger
    DPAnimate.scrollTrigger = function (element, options) {
        // default Options
        var defaultOptions = {
            start: 'top bottom',
            end: 'bottom top',
            once: false,
            onEnter: function () {
            },
            onEnterBack: function () {
            },
            onLeave: function () {
            },
            onLeaveBack: function () {
            },
            onUpdate: function () {

            }
        };

        // init trigger
        function ScrollTrigger(element, options) {
            // set options to default
            util.deepExtend((this.options = {}), defaultOptions);
            // merge in user options
            if (typeof options === 'object') util.deepExtend(this.options, options);
            // if type == string get element
            if (typeof element == 'string') element = document.querySelectorAll(element);
            // add to Class
            this.element = element;
            // cast to array
            if (this.element instanceof NodeList) {
                var _array = new DPNodeList();
                // loop elements
                this.element.forEach((e, i) => {
                    _array.push(e)
                });

                this.element = _array;
            }
            // get random id
            this.id = Math.floor(Math.random() * 10000000);
        }

        // remove from que
        ScrollTrigger.prototype.kill = function () {
            ScrollTriggerHandler.kill(this);
        }
        // remove from que
        ScrollTrigger.prototype.apply = function () {
            ScrollTriggerHandler.apply(this);
        }
        // init trigger
        let _trigger = new ScrollTrigger(element, options);
        // add scroll Trigger to Handler
        _trigger.apply();
        // return trigger to user
        return _trigger;
    };
    // mark as inet
    DPAnimate.hasInitialised = true;
    // back to window
    window.DPAnimate = DPAnimate
})(window.DPAnimate || {});