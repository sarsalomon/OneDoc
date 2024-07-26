const ApiError = require("../error/ApiError");
const model    = require('../database/db');
const { SendCode } = require("./SmsController");

class ContractController {
    async add (req, res, next) {
        const { userId, title, contractTemplateId, type, object, subjects } = req.body;
        console.log(req.body)
        const contract = await model.contract.create({
            userId: userId,
            title: title,
            contractTemplateId: contractTemplateId,
            contractObject: object,
            contractSubject: subjects,
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
        console.log(fetchContract)

    }

    async get (req, res, next) {
        const { id } = req.params;
        const getUser = await model.contract.findById(id);
        return res.json(getUser);
    }
    
    async getCode (req, res, next) {
        const { contractId } = req.body;

        let code = await SendCode();

        const updateContract = await model.contract.findByIdAndUpdate(contractId, {smsCode: code}, {new:true});
        console.log(updateContract)
        return res.json(updateContract);
    }

    async verifyCode (req, res, next) {
        const { contractId, code, device } = req.body;

        const findContract = await model.contract.findById(contractId);

        if (findContract && findContract.smsCode === code) {
            if (findContract.type == 1) {
                const updateContract = await model.contract.findByIdAndUpdate(contractId, {device: device, status: 'End'}, {new:true});
                return res.json(updateContract);
            } else if (findContract.type == 2) {
                const updateContract = await model.contract.findByIdAndUpdate(contractId, {device: device, status: 'WaitSignature'}, {new:true});
                return res.json(updateContract);
            } else if (findContract.type == 3) {
                const updateContract = await model.contract.findByIdAndUpdate(contractId, {status: 'End'}, {new:true});
                return res.json(updateContract);
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
            return res.json(updateContract);
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