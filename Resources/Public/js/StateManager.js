/*
 * Copyright (c) 2021.
 *
 * @category TYPO3
 *
 * @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */

function _StateManager() {
    this.callbacks = [];
    this.status = false;
}

_StateManager.prototype.attach = function (id, callback) {
    // params exist
    if (!id || !callback) return;
    // is already in handler
    let found = false;
    this.callbacks.map((_obj) => {
        if (_obj.name == id) {
            found = true;
            // override Function
            _obj.fnc = callback;
        }
    });
    // if not add new callback
    if (!found) {
        this.callbacks.push({
            name: id,
            fnc: callback,
        });
    }
    // run if not done yer
    if (this.status) {
        this.run({
            name: id,
            fnc: callback,
        });
    }
}

_StateManager.prototype.call = function () {
    this.callbacks.map((callback, index) => {
        this.run(callback);
    });

    this.status = true;
}

_StateManager.prototype.run = function (data) {
    // run callback
    try {
        data.fnc();
        // call event
        this.fireEvent(data.name);
    } catch (e) {
        console.log(e);
    }
}

_StateManager.prototype.fireEvent = function (name) {
    var event = document.createEvent('Event');
    event.initEvent(name, true, true);
    // fire Event
    document.dispatchEvent(event);
};

_StateManager.prototype.callByName = function (name) {
    try {
        this.callbacks.map((callback, index) => {
            // run callback by name
            if (callback.name == name) {
                this.run(callback);
            }
        });
    } catch (e) {
        console.log(e);
    }
};

window.StateManager = new _StateManager();

window.addEventListener('DOMContentLoaded', () => {
    window.StateManager.call();
}, false);

// new Statemanager for GASP
window.AnimateManager = new _StateManager();
// attach to Statemanager
window.StateManager.attach('animate-trigger', function () {
    // init GSAP Animations
    window.AnimateManager.call();
});
