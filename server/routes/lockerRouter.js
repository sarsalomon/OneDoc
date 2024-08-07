const Router = require("express");
const lockerController = require("../controllers/lockerController");
const router = new Router();

router.post('/', lockerController.fetch);
router.post('/add', lockerController.add);
router.get('/get/:id', lockerController.get);
router.post('/update', lockerController.update);
router.post('/delete', lockerController.delete);

router.post('/locker', lockerController.delete);

module.exports = router;