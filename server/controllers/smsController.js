const ApiError = require("../error/ApiError");
const bcrypt   = require('bcrypt');
const model    = require('../database/db');

class SmsController {
    async SendCode(req, res, next) {
        let code = Math.floor(Math.random() * 9999) + 1000;
        return code;
    }

    async SendMassage(req, res, next) {

    }

    async SendNewsletter(req, res, next) {
        
    }
}

module.exports = new SmsController();