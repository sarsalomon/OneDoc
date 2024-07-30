const Router = require("express");
const router = new Router();

const contractTemplateRouter = require("./contractTemplateRouter");
const contractRouter         = require("./contractRouter");
const appealRouter           = require("./appealRouter");
const smsRouter              = require("./smsRouter");
const userRouter             = require("./userRouter");

router.use('/contractTemplate', contractTemplateRouter);
router.use('/contract', contractRouter);
router.use('/appeal', appealRouter);
router.use('/sms', smsRouter);
router.use('/user', userRouter);

module.exports = router;