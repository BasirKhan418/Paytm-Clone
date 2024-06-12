const express = require("express");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");
const router = express.Router();
router.get("/balance", async (req, res) => {
  try {
    let a = await Account.findOne({ userid: req.user.id });
    if (a) {
      res.status(200).json({ status: true, balance: a.balance });
    } else {
      res
        .status(400)
        .json({
          status: false,
          message: "Account not found accound blocked or freezed",
        });
    }
  } catch (err) {
    res
      .status(400)
      .json({
        status: false,
        message: "Some thing went wrong try agin after some time " + err,
      });
  }
});
router.post("/transfer", async (req, res) => {
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    let acdata = await Account.findOne({ userid: req.user.id }).session(
      session
    );
    console.log(req.body);
    if (!acdata || acdata.balance < req.body.amount) {
      await session.abortTransaction();
      return res
        .status(400)
        .json({ status: false, message: "Insufficient balance" });
    }
    let toacdata = await Account.findOne({ userid: req.body.to }).session(
      session
    );
    console.log(toacdata);
    if (!toacdata) {
      await session.abortTransaction();
      return res
        .status(400)
        .json({
          status: false,
          message: "Account not found or Invalid Account",
        });
    }
    await Account.updateOne(
      { userid: req.user.id },
      { $inc: { balance: -req.body.amount } }
    ).session(session);
    await Account.updateOne(
      { userid: req.body.to },
      {
        $inc: { balance: req.body.amount },
      }
    ).session(session);
    await session.commitTransaction();
    session.endSession();
    return res
      .status(200)
      .json({ status: true, message: "Amount transfered successfully" });
  } catch (err) {
    return res
      .status(400)
      .json({
        status: false,
        message: "Some thing went wrong try agin after some time " + err,
      });
  }
});
module.exports = router;
