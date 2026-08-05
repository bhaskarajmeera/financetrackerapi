import express from "express";
import auth from "../middlewares/authMiddleware.js";
import { createTransaction, deleteTransactions, getTransactionsByUser } from "../models/transaction/TransactionModel.js";

const router = express.Router();

/* create a new transaction */
router.post("/transactions", auth, async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      userId: req.userInfo._id,
      amount: Number(req.body.amount),
    };

    const transactions = await createTransaction(payload);

    res.status(201).json({
      status: "success",
      message: "Transaction saved",
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

/* return all the transactions for specific user */
router.get("/", async (req, res, next) => {
  try {
    const { _id } = req.userInfo;
    const transactions = await getTransactionsByUser(_id);
    res.json({
      status: "success",
      message: "Transactions fetched",
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

/* delete a transaction ids and user_ids */
router.delete("/",auth,  async(req, res, next) => {
  try {
    const ids  = req.body;
    const {_id} = req.userInfo._id;
    console.log("ids", ids);
    console.log("userId", _id);
    const deletedTransactions = await deleteTransactions({ userId: _id, idsToDelete: ids });
    res.json({
      status: "success",
      message: "Transaction deleted",
      data: deletedTransactions
    });
  }
  catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});
export default router;
