import TransactionSchema from "./TransactionSchema.js";

export const createTransaction = (transactionObj) => {
  return TransactionSchema(transactionObj).save();
};

export const getTransactionsByUser = (userId) => {
  return TransactionSchema.find({ userId }).sort({ createdAt: -1 });
};
