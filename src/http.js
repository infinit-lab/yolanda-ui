import axios from "axios";

var http = {
    _token: "",
    onErrorMessage: null,
    onUnauthorized: null,

    setToken(token) {
        this._token = token;
    },
    getToken() {
        return this._token;
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

            if (("response" in error) === false) {
                return;
            }

            if (errorMessage !== '' && _this.onErrorMessage !== null) {
                let message = errorMessage;
                if (typeof error.response.data === "object") {
                    if ("error" in error.response.data) {
                        message = message + " : " + error.response.data.error;
                    }
                }
                if (typeof _this.onErrorMessage === "function") {
                    _this.onErrorMessage(message);
                }
            }

            if (error.response.status === 401) {
                if (typeof _this.onUnauthorized === "function") {
                    _this.onUnauthorized()
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
