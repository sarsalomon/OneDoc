const { Schema, model } = require('mongoose');

const TemplateSchema = new Schema({
    title: {type: String},
    objects: {type: String},
    subjects: {type: String},
    forms: {type: String},
    fields: {type: String},
    types: {type: String},
    status: {type: Boolean}
}, { timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'} });

const ContractSchema = new Schema({
    userId: {type: String},
    title: {type: String},
    contractTemplateId: {type: String},
    contractObject: {type: String},
    contractSubject: {type: String},
    type: {type: String},
    device: {type: String},
    image: {type: String},
    smsCode: {type: String},
    status: {type: String}
}, { timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'} });

const AppealSchema = new Schema({
    userId: {type: String},
    contractTemplateId: {type: String},
    userInfo: {type: String},
    status: {type: String}
}, { timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'} });

const SmsSchema = new Schema({
    title: {type: String},
    contractTemplateId: {type: String},
    contractObject: {type: String},
    contractSubject: {type: String},
    type: {type: String},
    device: {type: String},
    image: {type: String},
    smsCode: {type: String},
    status: {type: String}
}, { timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'} });

const UserSchema = new Schema({
    name: {type: String},
    surname: {type: String},
    phone: {type: String},
    password: {type: String},
    birthday: {type: String},
    passport: {type: String},
    role: {type: String},
    activaCode: {type: String},
    companyName: {type: String},
    companySTIR: {type: String},
    companyAddress: {type: String},
    companyPhone: {type: String},
    money: {type: Number},
    status: {type: Boolean}
}, { timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'} });

module.exports.template = model("Template", TemplateSchema);
module.exports.contract = model("Contract", ContractSchema);
module.exports.appeal   = model("Appeal", AppealSchema);
module.exports.sms      = model("Sms", SmsSchema);
module.exports.user     = model("User", UserSchema);
