const Router = require("express");
const router = new Router();

const contractTemplateRouter = require("./contractTemplateRouter");
const contractRouter         = require("./contractRouter");
const userRouter             = require("./userRouter");

router.use('/contractTemplate', contractTemplateRouter);
router.use('/contract', contractRouter);
router.use('/user', userRouter);

module.exports = router;