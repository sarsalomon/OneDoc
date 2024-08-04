const ApiError = require("../error/ApiError");
const bcrypt   = require('bcrypt');
const model    = require('../database/db');

class TemplateController {
    async add (req, res, next) {
        
    }

    async fetch (req, res, next) {
        const { typies } = req.body;
        const fetchTemplates = await model.template.find();
        return res.json(fetchTemplates);
    }

    async get (req, res, next) {
        const { id } = req.params;
        console.log(id)
        const getTemplate = await model.template.findById(id);
        console.log(getTemplate)
        return res.json(getTemplate);
    }
    
    async update (req, res, next) {
        
    }
    
    async delete (req, res, next) {
        
    }
}

module.exports = new TemplateController();