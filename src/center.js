var center = {
    _subscribers: {},

    subscribe(key, subscriber) {
        let list = this._subscribers[key]
        if (typeof list === "undefined") {
            list = [subscriber];
            this._subscribers[key] = list;
        } else {
            for (let i = 0; i < list.length; i++) {
                if (list[i] === subscriber) {
                    return;
                }
            }
            list.push(subscriber);
        }
    },
    unsubscribe(key, subscriber) {
        const list = this._subscribers[key];
        if (typeof list != "undefined") {
            let index = -1;
            for (let i = 0; i < list.length; i++) {
                if (list[i] === subscriber) {
                    index = i;
                    break;
                }
            }
            if (index != -1) {
                list.splice(index, 1);
            }
        }
    },
    publish(key, value) {
        const list = this._subscribers[key];
        if (list != null) {
            for (let i = 0; i < list.length; i++) {
                list[i].notify(key, value);
            }
        }
    }
}

export default center;
