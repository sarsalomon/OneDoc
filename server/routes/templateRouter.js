const Router = require("express");
const templateController = require("../controllers/templateController");
const router = new Router();

router.post('/', templateController.fetch);
router.post('/add', templateController.add);
router.get('/get/:id', templateController.get);
router.post('/update', templateController.update);
router.post('/delete', templateController.delete);

module.exports = router;