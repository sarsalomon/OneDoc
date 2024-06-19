const Router = require("express");
const contractTemplateController = require("../controllers/contractTemplateController");
const router = new Router();

router.post('/', contractTemplateController.fetch);
router.post('/add', contractTemplateController.add);
router.get('/get/:id', contractTemplateController.get);
router.post('/update', contractTemplateController.update);
router.post('/delete', contractTemplateController.delete);

module.exports = router;