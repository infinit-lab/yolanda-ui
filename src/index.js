import center from "./center.js";
import Subscriber from "./subscriber.js";
import notifier from "./notifier.js";
import http from "./http.js";

var yolanda = {
  subscribe(key, callback) {
    let subscriber = new Subscriber(callback);
    center.subscribe(key, subscriber);
    return subscriber;
  },
  unsubscribe(key, subscriber) {
    center.unsubscribe(key, subscriber);
  },
  publish(key, value) {
    center.publish(key, value)
  },
  registerNotifyCallback(callback) {
    notifier.registerCallback(callback);
  },
  connectNotifier(url) {
    notifier.connect(url + "?token=" + http.getToken());
  },
  diconnectNotifier() {
    notifier.disconnect();
  },
  setToken(token) {
    http.setToken(token);
  },
  registerUnauthorizedCallback(callback) {
    http.onUnauthorized = callback;
  },
  registerErrorMessageCallback(callback) {
    http.onErrorMessage = callback;
  },
  sendHttpRequest(request, callback, errorMessage) {
    http.send(request, callback, errorMessage);
  },
  isResultTrue(response) {
    return http.isResultTrue(response);
  }
};

export default yolanda;
