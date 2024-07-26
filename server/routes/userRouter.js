const Router = require("express");
const userController = require("../controllers/userController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', AuthMiddleware, userController.check);
router.get('/get/:id', userController.getUser);
router.post('/update', userController.updateUser);
router.post('/updatecompany', userController.updateUserCompany);

module.exports = router;