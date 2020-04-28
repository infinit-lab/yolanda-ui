import axios from 'axios'

var http = {
    _token: "",
    _onerror: null,

    setToken(token) {
        this._token = token
    },
    onerror (callback) {
        this._onerror = callback
    },
    send (request, callback, component, errorMessage) {
        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': this._token
        }
        if ('headers' in request) {
            request.headers = Object.assign(request.headers, headers)
        } else {
            request = Object.assign(request, {
                headers: headers
            })
        }
        const _this = this
        axios(request).then(callback).catch(function (error) {
            if (callback != null) {
                callback(error.response)
            }

            if (component != null && errorMessage !== '' && _this._onerror !== null) {
                message = errorMessage
                if (typeof error.response.data === 'object') {
                    if ('error' in error.response.data) {
                        message = message + " : " + error.response.data.error
                    }
                }
                _this._onerror(component, message)
            }
        })
    },
    isResultTrue (response) {
        if (typeof response === 'undefined') {
            return false
        }
        if (response.status === 200 && typeof response.data === 'object') {
            return ('result' in response.data && response.data.result)
        }
        return false
    }
}

export default http
