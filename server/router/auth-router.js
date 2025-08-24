const express = require ("express");
const router = express.Router();
// const {home,register} = require("../controllers/auth-controller")
// or if you dont want write all the home register and many more to made
const vinay = require("../controllers/auth-controller.js")
const {signupSchema,loginSchema} = require("../validators/auth-validator.js")
const validate = require("../middlewares/validate-middleware.js")
const authMiddleware = require("../middlewares/auth-midlleware.js")

router.route("/").get(vinay.home);
router.route("/register").post(validate(signupSchema),vinay.register);
router.route("/login").post(validate(loginSchema),vinay.login);
router.route("/user").get(authMiddleware ,vinay.user);

module.exports = router;