
const { exec } = require('child_process');
const path = require('path');

const bcrypt   = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const ApiError = require("../error/ApiError");
const model    = require('../database/db');


class LockerController {
    async add (req, res, next) {
        
    }

    async fetch (req, res, next) {
        const { typies } = req.body;
        const fetchTemplates = await model.template.find();
        return res.json(fetchTemplates);
    }

    async get (req, res, next) {
    }
    
    async update (req, res, next) {
        
    }
    
    async delete (req, res, next) {
        
    }

    async locker (req, res, next) {
        const { password } = req.body;
        const { file } = req.files;

        let fileName = uuidv4() + ".pdf";

        let paths = path.resolve(__dirname, '..', 'data', 'pdf', fileName); 

        file.mv(paths);

        const exePath = path.resolve('/root/OneDoc/python/dist/index');

        exec(`"${exePath}" "${paths}" "${password}"`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Execution error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Standard error: ${stderr}`);
                return;
            }
            let pdfFileName = stdout.replace('/root/OneDoc/server/data/pdf/', ' https://api.1doc.uz/pdf/');
            return res.json(pdfFileName)
        });
    }
}

module.exports = new LockerController();