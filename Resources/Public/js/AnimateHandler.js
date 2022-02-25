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
            if (st > lastScrollTop || st == lastScrollTop) scrollDirection = 'down';
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
        function callTrigger(trigger, direction) {
            if (cleanProcessDOM(trigger)) return;
            // trigger events for element
            if (trigger.element instanceof DPNodeList) {
                trigger.element.forEach((element, i) => {
                    isCondition(element, trigger, direction);
                })
            } else if (trigger.element instanceof HTMLDivElement) {
                isCondition(trigger.element, trigger, direction);
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
        function isCondition(element, trigger, direction) {
            if(typeof direction != 'undefined') scrollDirection = direction;
            // Start Event prepare
            var startTrigger = trigger.options.start.split(' ');
            var endTrigger = null
            if(trigger.options.end) endTrigger = trigger.options.end.split(' ');
            // update values
            startTrigger[0] = replaceElementTriggerPosition(startTrigger[0], element);
            if(endTrigger) endTrigger[0] = replaceElementTriggerPosition(endTrigger[0], element);
            // get triggerpoint
            startTrigger[1] = replaceTriggerPosition(startTrigger[1], element);
            if(endTrigger) endTrigger[1] = replaceTriggerPosition(endTrigger[1], element);
            if (scrollDirection == 'down') {
                // onLeave callback
                if (endTrigger && isActive(element) && endTrigger[0] < endTrigger[1]) {
                    // unset active
                    if (trigger.options.once == false) unsetActive(element);
                    // run callback
                    var cbk = trigger.options.onLeave.bind(this);
                    cbk(element);
                }
                // onUpdateCallback
                if (endTrigger && isActive(element)) {
                    // run callback
                    var cbk = trigger.options.onUpdate.bind(this);
                    cbk(element);
                }
                // onEnter callback
                if (!isActive(element) && startTrigger[0] <= startTrigger[1] && (!endTrigger || endTrigger[0] >= endTrigger[1])) {
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
                if (!isActive(element) && (!endTrigger || endTrigger[0] >= endTrigger[1]) && startTrigger[0] < startTrigger[1]) {
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
            if (typeof element.dataset.dpScroll == 'undefined' || element.dataset.dpScroll != 1) return false
            return true;
        }

        /**
         * mark as active
         * @param element
         */
        function setActive(element) {
            element.dataset.dpScroll = 1;
        }

        /**
         * mark as inaktive
         * @param element
         */
        function unsetActive(element) {
            element.dataset.dpScroll = 0;
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
                callTrigger(trigger, 'down');
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
            end: null,
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
        function ScrollTrigger() {
            // set options to default
            util.deepExtend((this.options = {}), defaultOptions);
            // merge in user options
            if (typeof options === 'object') util.deepExtend(this.options, options);
            // if type == string get element
            if (typeof element == 'string') element = document.querySelectorAll(element);
            // add to Class
            this.element = element;
            // cast to array
            if (!(this.element instanceof Array) && !(this.element instanceof HTMLDivElement) || this.element instanceof NodeList) {
                var _array = new DPNodeList();
                // loop elements
                if (this.element instanceof NodeList) {
                    this.element.forEach((e, i) => {
                        _array.push(e)
                    });
                } else {
                    this.element.map((e, i) => {
                        if (i instanceof HTMLDivElement) _array.push(i);
                        else _array.push(e);
                    });
                }

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
        let _trigger = new ScrollTrigger();
        // add scroll Trigger to Handler
        _trigger.apply();
        // return trigger to user
        return _trigger;
    };
    // Animation Handler
    DPAnimate.animate = function (element, options) {
        var defaultOptions = {
            class: 'animated',
            stagger: 0,
            delay: 0,
            repeat: 0,
            duration: 0,
            onComplete: function () {
            }
        };
        // abort if not exists
        if(typeof element == 'undefined') return;

        /**
         * Private: get classes
         * @returns {string[]}
         */
        function getClasses(classString) {
            return classString.split(' ');
        }

        function InitAnimation(_DPAnimate, element, delay) {
            // only start if no animation in Progress
            if (_DPAnimate.cbkCounter != 0) return;
            // get class to add
            var $classes = getClasses(_DPAnimate.options.class);
            // set delay to element
            element.style.animationDelay = delay + "s";
            // define repat
            if (_DPAnimate.options.repeat) {
                // set repat to infinite
                if (_DPAnimate.options.repeat == -1) {
                    element.style.animationIterationCount = 'infinite';
                }
                // set repeat time
                if (_DPAnimate.options.repeat > 0) {
                    element.style.animationIterationCount = _DPAnimate.options.repeat;
                }
            }
            // define duration
            if (_DPAnimate.options.duration && _DPAnimate.options.duration > 0) {
                element.style.animationDuration = _DPAnimate.options.duration + 's';
            }

            // eventHandler
            function wrapper() {
                // remove Listener
                element.removeEventListener("animationend", wrapper, true);
                _DPAnimate.cbkCounter += 1;
                if (_DPAnimate.cbkCounter == _DPAnimate.element.length) {
                    //cbk
                    var cbk = _DPAnimate.options.onComplete.bind(_DPAnimate);
                    cbk(element);
                    // reset classes
                    _DPAnimate.stop();
                    // reset for new start
                    setTimeout(() => {
                        _DPAnimate.cbkCounter = 0;
                    }, 10)
                }
            }

            // add callback
            element.addEventListener('animationend', wrapper, true);
            // add Classes and start animation
            $classes.map(e => {
                element.classList.add(e);
            });
        }

        /**
         * @constructor
         */
        function DPAnimate() {
            this.cbkCounter = 0;
            // set options to default
            util.deepExtend((this.options = {}), defaultOptions);
            // merge in user options
            if (typeof options === 'object') util.deepExtend(this.options, options);
            // if type == string get element
            if (typeof element == 'string') element = document.querySelectorAll(element);
            // add to Class
            this.element = element;
            if (this.element instanceof HTMLDivElement) {
                var _array = new DPNodeList();
                _array.push(this.element);
                this.element = _array;
            }
            // cast to arraylist
            if (!(this.element instanceof Array) || this.element instanceof NodeList) {
                var _array = new DPNodeList();
                // loop elements
                if (this.element instanceof NodeList) {
                    this.element.forEach((e, i) => {
                        _array.push(e)
                    });
                } else {
                    this.element.map((e, i) => {
                        if (i instanceof HTMLDivElement) _array.push(i);
                        else _array.push(e);
                    });
                }

                this.element = _array;
            }
            // start animation
            this.run();
        }

        /**
         * Start Animation
         */
        DPAnimate.prototype.run = function () {
            // set delay
            var delay = this.options.delay;
            // check by type
            this.element.map((element, i) => {
                var stagger = i * this.options.stagger;
                InitAnimation(this, element, (delay + stagger));
            });
        }

        /**
         * remove Class from Elements
         */
        DPAnimate.prototype.stop = function () {
            var $classes = getClasses(this.options.class);
            this.element.forEach((element, i) => {
                $classes.map(e => {
                    element.classList.remove(e);
                });
            })
        }
        // return new Object
        return new DPAnimate();
    };
    // mark as inet
    DPAnimate.hasInitialised = true;
    // back to window
    window.DPAnimate = DPAnimate
})(window.DPAnimate || {});