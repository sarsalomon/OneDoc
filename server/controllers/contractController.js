const ApiError = require("../error/ApiError");
const model    = require('../database/db');
const { SendCode } = require("./smsController");
const mongoose = require('mongoose');

class ContractController {
    async add (req, res, next) {
        const { userId, title, templateId, type, object, subjects } = req.body;

        const contract = await model.contract.create({
            userId: userId,
            title: title,
            templateId: templateId,
            object: object,
            subject: subjects,
            type: type,
            device: '',
            image: '',
            smsCode: '',
            status: 'Create'
        });

        return res.json(contract);
    }

    async fetch (req, res, next) {

    }

    async fetchById (req, res, next) {
        const { id } = req.body;
        const fetchContract = await model.contract.find({userId: id});
        return res.json(fetchContract);
    }

    async get (req, res, next) {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
    
        try {
            const getUser = await model.contract.findById(id);
            if (!getUser) {
                return res.status(404).json({ error: 'Contract not found' });
            }
            return res.json(getUser);
        } catch (error) {
            return next(error);
        }
    }
    
    async getCode (req, res, next) {
        const { contractId } = req.body;
        let code = await SendCode();
        const updateContract = await model.contract.findByIdAndUpdate(contractId, {smsCode: code}, {new:true});
        return res.json(updateContract);
    }

    async verifyCode (req, res, next) {
        const { contractId, code, device } = req.body;

        const findContract = await model.contract.findById(contractId);

        if (findContract && findContract.smsCode === code) {
            if (findContract.type == 1) {
                const updateContract = await model.contract.findByIdAndUpdate(contractId, {device: device, status: 'End'}, {new:true});
                return res.json('success');
            } else if (findContract.type == 2) {
                const updateContract = await model.contract.findByIdAndUpdate(contractId, {device: device, status: 'WaitSignature'}, {new:true});
                return res.json('success');
            } else if (findContract.type == 3) {
                const updateContract = await model.contract.findByIdAndUpdate(contractId, {status: 'End'}, {new:true});
                return res.json('success');
            } else {
                return next(ApiError.internal("General:Auth:UserNotFoundError"));
            }
        } else {
            return next(ApiError.internal("General:Auth:UserNotFoundError"));
        }
    }
    
    async verifySignature (req, res, next) {
        const { contractId, image, device } = req.body;

        const findContract = await model.contract.findById(contractId);

        if (findContract) {
            const updateContract = await model.contract.findByIdAndUpdate(contractId, {device: device, image: image, status: 'End'}, {new:true});
            return res.json('success');
        } else {
            return next(ApiError.internal("General:Auth:UserNotFoundError"));
        }
    }

    async update (req, res, next) {
        
    }
    
    async delete (req, res, next) {
        
    }
}

module.exports = new ContractController();