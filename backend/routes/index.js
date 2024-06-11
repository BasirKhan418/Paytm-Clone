const express = require('express');
const userRouter = require("./User")
const AuthMiddleware = require("../middleware/index")
const accountRouter = require("./Account");
const router = express.Router();
router.use("/user",userRouter);
router.use("/account",AuthMiddleware,accountRouter);
module.exports = router;