const ApiError = require("../error/ApiError");
const model    = require('../database/db');

const bcrypt   = require('bcrypt');
const { exec } = require('child_process');
const path = require('path');

class LockerController {
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

    async locker (req, res, next) {
        const { password } = req.body;
        const { file } = req.files;

        let fileName = uuid.v4() + ".pdf";
        let paths = path.resolve(__dirname, '..', 'data', 'pdf', fileName); 

        file.mv(paths);

        const exePath = path.resolve(__dirname, 'python/dist', 'index');

        exec(`"${exePath}" "${paths}" "${password}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Execution error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Standard error: ${stderr}`);
            return;
        }
        console.log(stdout);
        
        });

    }
}

module.exports = new LockerController();