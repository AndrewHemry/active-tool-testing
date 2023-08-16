const express = require("express");

let router = new express.Router()
let authController = require("../controller/authController")

router.get('/callback', authController.getAuthorizationCode)

module.exports = router;