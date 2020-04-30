class Subscriber {
    constructor (callback) {
        this._callback = callback;
    }

    notify (key, value) {
        if (typeof this._callback === "function") {
            this._callback(key, value);
        }
    }
}

export default Subscriber;
