const ApiError = require("../error/ApiError");
const jwt      = require('jsonwebtoken');
const bcrypt   = require('bcrypt');
const model    = require('../database/db');
const { SendCode } = require("./smsController");

const generateJwt = (id, login, name, money, phone, companyName, companySTIR, companyAddress, companyPhone, role) => {
    return token = jwt.sign(
        { id, login, name, money, phone, companyName, companySTIR, companyAddress, companyPhone, role },
        process.env.SECRET_KEY,
        { expiresIn: '99d' }
    )
}

class UserController {
    async registration(req, res, next) {
        const { name, surname, phone, password, whois } = req.body;
        
        if (!name) {
            return next(ApiError.badRequest("General:Auth:Registration:Name_error"));
        } else if (!surname) {
            return next(ApiError.badRequest("General:Auth:Registration:Surname_error"));
        } else if (!phone) {
            return next(ApiError.badRequest("General:Auth:Registration:Phone_error"));
        } else if (!password) {
            return next(ApiError.badRequest("General:Auth:Registration:Password_error"));
        } else if (!whois) {
            return next(ApiError.badRequest("General:Auth:Registration:Whois_error"));
        }

        const condidate = await model.user.findOne({ phone });

        if (condidate) {
            return next(ApiError.badRequest("General:Auth:Registration:UserExitingError"));
        }
        
        let code = await SendCode();

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await model.user.create({ name, surname, phone, password: hashPassword, birthday: '', passport: '', role: whois, activaCode: code, companyName: '', companySTIR: '', companyAddress: '', companyPhone: '', money: 0, status: false });
        const token = generateJwt(user.id, user.login, `${user.name} ${user.surname}`, user.money, user.phone, user.companyName, user.companySTIR, user.companyAddress, user.companyPhone, user.role);
        return res.json({token});
    }

    async login(req, res, next) {
        const { phone, password } = req.body;
        const user = await model.user.findOne({ phone });

        if (!user) {
            return next(ApiError.internal("General:Auth:UserNotFoundError"));
        }

        let comparePassword = bcrypt.compareSync(password, user.password);

        if (!comparePassword) {
            return next(ApiError.internal('General:Auth:UserPasswordError'));
        }

        const token = generateJwt(user.id, user.login, `${user.name} ${user.surname}`, user.money, user.phone, user.companyName, user.companySTIR, user.companyAddress, user.companyPhone, user.role);
        return res.json({token});
    }

    async ActivationUser (req, res, next) {

    }

    async ResetPassword (req, res, next) {

    }

    async getUser (req, res, next) {
        const { id } = req.params;
        const getUser = await model.user.findById(id);
        return res.json(getUser);
    }

    async updateUser (req, res, next) {
        const { id, name, surname, birthday, passport } = req.body;
        const updateUser = await model.user.findByIdAndUpdate(id, { name, surname, birthday, passport }, {new:true})
        if (updateUser) {
            return res.json("success");
        } else {
            return res.json("error");
        }
    }

    async updateUserCompany (req, res, next) {
        const { id, companyName, companySTIR, companyAddress, companyPhone } = req.body;
        const updateCompany = await model.user.findByIdAndUpdate(id, { companyName, companySTIR, companyAddress, companyPhone }, {new:true})
        if (updateCompany) {
            return res.json("success");
        } else {
            return res.json("error");
        }
    }

    async check (req, res, next) {
        const token = generateJwt(req.user.id, req.user.login, req.user.name, req.user.money, req.user.phone, req.user.companyName, req.user.companySTIR, req.user.companyAddress, req.user.companyPhone, req.user.role);
        return res.json({token});
    }
}

module.exports = new UserController();