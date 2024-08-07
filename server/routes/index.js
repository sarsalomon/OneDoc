const Router = require("express");
const router = new Router();

const templateRouter = require("./templateRouter");
const contractRouter = require("./contractRouter");
const appealRouter   = require("./appealRouter");
const smsRouter      = require("./smsRouter");
const lockerRouter   = require("./lockerRouter");
const userRouter     = require("./userRouter");

router.use('/template', templateRouter);
router.use('/contract', contractRouter);
router.use('/appeal', appealRouter);
router.use('/sms', smsRouter);
router.use('/locker', lockerRouter);
router.use('/user', userRouter);

module.exports = router;