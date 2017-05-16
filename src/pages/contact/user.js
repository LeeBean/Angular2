"use strict";
var User = (function () {
    function User(username, tel, pwd) {
        this.username = username;
        this.tel = tel;
        this.pwd = pwd;
    }
    return User;
}());
exports.User = User;
