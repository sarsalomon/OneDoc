const Router = require("express");
const contractController = require("../controllers/contractController");
const router = new Router();

router.post('/', contractController.fetch);
router.post('/add', contractController.add);
router.get('/get/:id', contractController.get);
router.post('/update', contractController.update);
router.post('/delete', contractController.delete);

module.exports = router;