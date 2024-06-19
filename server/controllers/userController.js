const ApiError = require("../error/ApiError");
const jwt      = require('jsonwebtoken');
const bcrypt   = require('bcrypt');
const model    = require('../database/db');
const { SendCode } = require("./SmsController");

const generateJwt = (id, login, name, money, role) => {
    return token = jwt.sign(
        {id, login, name, money, role},
        process.env.SECRET_KEY,
        {expiresIn: '99d'}
    )
}

class UserController {
    async registration(req, res, next) {
        const { phone, password, role } = req.body;
        
        if (!phone && phone.lenght == 9) {
            return next(ApiError.badRequest("Phone_error"));
        } else if (!password) {
            return next(ApiError.badRequest("Password_error"));
        }

        const condidate = await model.user.findOne({ phone });

        if (condidate) {
            return next(ApiError.badRequest("User_exiting_error"));
        }
        
        let code = await SendCode();
        console.log(code)

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await model.user.create({name: '', surname: '', phone, password: hashPassword, role: role, activaCode: code, corporateName: '', corporateStir: '', corporateDate: '', money: 0, status: false});
        const token = generateJwt(user.id, user.login, `${user.name} ${user.surname}`, user.money, user.role);
        return res.json({token});
    }

    async login(req, res, next) {
        const { phone, password } = req.body;
        console.log(req.body)

        const user = await model.user.findOne({ phone });
        console.log(user)

        if (!user) {
            return next(ApiError.internal("User_erwww"));
        }

        let comparePassword = bcrypt.compareSync(password, user.password);

        if (!comparePassword) {
            return next(ApiError.internal('User_error'));
        }

        const token = generateJwt(user.id, user.login, `${user.name} ${user.surname}`, user.money, user.role);
        return res.json({token});
    }

    async ActivationUser (req, res, next) {

    }

    async ResetPassword (req, res, next) {

    }

    async check (req, res, next) {
        const token = generateJwt(req.user.id, req.user.login, req.user.name, req.user.money, req.user.role);
        return res.json({token});
    }
}

module.exports = new UserController();