const express = require('express')
const router = express.Router()
const headerValidator = require('../api/utils/headersValidator')
const userController = require('../api/v1/controllers/userController')

router.post('/refreshToken', headerValidator.validateLanguage, userController.refreshToken);
router.post('/register',headerValidator.nonAuthValidation,userController.register);
router.post('/login',headerValidator.nonAuthValidation,userController.login);
router.post('/search',headerValidator.authoriseUser,headerValidator.authValidation,userController.search);
router.get('/logout',headerValidator.authValidation,userController.logout);


module.exports = router