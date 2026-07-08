import express from "express";
import auth from "../middlewares/authMiddleware.js";
import { createTransaction, getTransactionsByUser } from "../models/transaction/TransactionModel.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const transactions = await getTransactionsByUser(req.userInfo._id);
    res.json({
      status: "success",
      message: "Transactions fetched",
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      userId: req.userInfo._id,
      amount: Number(req.body.amount),
    };

    const transaction = await createTransaction(payload);

    res.status(201).json({
      status: "success",
      message: "Transaction saved",
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default router;
