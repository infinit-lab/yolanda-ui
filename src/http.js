import axios from "axios";

var http = {
    _token: "",
    onErrorMessage: null,
    _onUnauthorized: null,

    setToken(token) {
        this._token = token;
    },
    getToken() {
        return this._token;
    },
    onErrorMessage(callback) {
        this._onErrorMessage = callback;
    },
    onUnauthorized(callback) {
        this._onUnauthorized = callback;
    },
    send(request, callback, errorMessage) {
        const headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": this._token
        };
        if ("headers" in request) {
            request.headers = Object.assign(request.headers, headers);
        } else {
            request = Object.assign(request, {
                headers: headers
            });
        };
        const _this = this;
        axios(request).then(callback).catch(function (error) {
            if (callback != null) {
                callback(error.response);
            }

            if (errorMessage !== '' && _this._onErrorMessage !== null) {
                let message = errorMessage;
                if (typeof error.response.data === "object") {
                    if ("error" in error.response.data) {
                        message = message + " : " + error.response.data.error;
                    }
                }
                if (typeof _this._onErrorMessage === "function") {
                    _this._onErrorMessage(message);
                }
            }

            if (error.response.status === 401) {
                if (typeof _this._onUnauthorized === "function") {
                    _this._onUnauthorized()
                }
            }
        })
    },
    isResultTrue(response) {
        if (typeof response === "undefined") {
            return false;
        }
        if (response.status === 200 && typeof response.data === "object") {
            return ("result" in response.data && response.data.result);
        }
        return false;
    }
}

export default http
