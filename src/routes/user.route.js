const router = require('express').Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/checkLogin', authMiddleware.isAuth, userController.checkLogin);
module.exports = router;