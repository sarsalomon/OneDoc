const { Schema, model } = require('mongoose');

const ContractTemplateSchema = new Schema({
    title: {type: String},
    fields: {type: String},
    status: {type: Boolean}
}, { timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'} });


const ContractSchema = new Schema({
    title: {type: String},
    contractTemplateId: {type: String},
    status: {type: Boolean}
}, { timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'} });

const UserSchema = new Schema({
    name: {type: String},
    surname: {type: String},
    phone: {type: String},
    password: {type: String},
    role: {type: String},
    activaCode: {type: String},
    corporateName: {type: String},
    corporateStir: {type: String},
    corporateData: {type: String},
    money: {type: Number},
    status: {type: Boolean}
}, { timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'} });

module.exports.contractTemplate = model("ContractTemplate", ContractTemplateSchema);
module.exports.contract         = model("Contract", ContractSchema);
module.exports.user             = model("User", UserSchema);
