const express = require("express");
const router = express.Router();
const {celebrate} = require("celebrate")
const {userVerification} = require("../services/celebrate_service")
const UserController = require("../controllers/user_controller")

router.post("/register", celebrate(userVerification), UserController.register);
router.post("/login", celebrate(userVerification), UserController.loginVerify);

module.exports = router;