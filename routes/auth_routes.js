const express = require("express");
const router = express.Router();
const passport = require("passport");
const { celebrate } = require("celebrate");
const { userVerification } = require("../services/celebrate_service");
const UserController = require("../controllers/user_controller");

// router.post("/register", celebrate(userVerification), UserController.register);
router.get("/users", passport.authenticate("jwt", { session: false }), UserController.index)
router.post("/register", UserController.register);
router.post("/login", celebrate(userVerification), UserController.loginVerify);
router.patch("/login", passport.authenticate("jwt", { session: false }), UserController.update);
router.post("/refresh", passport.authenticate("jwt", { session: false }), UserController.refresh);

module.exports = router;