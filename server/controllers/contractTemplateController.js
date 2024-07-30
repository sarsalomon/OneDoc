const ApiError = require("../error/ApiError");
const model    = require('../database/db');

class ContractTemplateController {
    async add (req, res, next) {
        
    }

    async fetch (req, res, next) {

    }

    async get (req, res, next) {
        const { id } = req.params;
        const getUser = await model.contractTemplate.findById(id);
        console.log(getUser)
        return res.json(getUser);
    }
    
    async update (req, res, next) {
        
    }
    
    async delete (req, res, next) {
        
    }
}

module.exports = new ContractTemplateController();