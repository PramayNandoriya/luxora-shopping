const { signup, login } = require("../controller/AuthController");
const { signupValidation, loginValidation } = require("../middleware/AuthValidation");

const router = require("express").Router();

router.post('/login',loginValidation,login);
router.post('/SignUp',signupValidation,signup);

module.exports = router;