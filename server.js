
import express from 'express'
import cors from "cors";
const app = express()
const PORT = process.env.PORT || 8000
/* Connect DB */
import conMongoDb from "./config/mongodbConfig.js";
conMongoDb();
/* middleware */
app.use(express.json())
app.use(cors());

/* api end point */
import userRouter from "./routers/userRouter.js";
app.use("/api/v1/users", userRouter)
/* api end point for transactions */
import transactionRouter from "./routers/transactionRouter.js"
import { errorHandler } from './middlewares/errorHandlerMiddleware.js';
app.use("/api/v1/transactions", transactionRouter)

app.get('/', (req, res, next) => {
  res.json({message:"Hello World"})
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

/* 404 page not found */
app.use((req, res, next) => {
  const error = new Error("Page not found");
  error.statusCode = 404;
  next(error);
});

/* global error handler */
app.use(errorHandler); 