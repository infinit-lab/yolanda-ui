var notifier = {
    _ws: null,
    _timer: 0,
    _started: false,
    _url: "",
    _callback: null,

    registerCallback(callback) {
        this._callback = callback;
    },
    connect(url) {
        if (this._started === true) {
            return;
        }
        this._started = true
        this._url = url
        this._connect();
    },
    _connect() {
        console.log("_connect");
        this._ws = new WebSocket(this._url);
        const _this = this;
        this._ws.onerror = function (event) {
            console.log(event);
            _this.ws = null;
            if (_this._started === true) {
                _this._reconnect();
            }
        }
        this._ws.onclose = function (event) {
            console.log(event);
            _this._ws = null;
            if (_this._started === true) {
                _this._reconnect();
            }
        }
        this._ws.onmessage = function (event) {
            if (_this._callback !== null) {
                _this._callback(event.data);
            }
        }
        this._ws.onopen = function (event) {
            console.log(event);
        }
    },
    _reconnect() {
        if (this._timer != 0 || this._started === false) {
            return;
        }
        console.log("_reconnect");
        const _this = this;
        this._timer = setTimeout(function() {
            _this._connect();
            _this._timer = 0;
        }, 2000);
    },
    disconnect() {
        this._started = false;
        if (this._timer != 0) {
            clearTimeout(this._timer);
            this._timer = 0;
        }
        if (this._ws != null) {
            this._ws.close();
            this._ws = null;
        }
    }
};

export default notifier;
