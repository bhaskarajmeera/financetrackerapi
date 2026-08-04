
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
app.use("/api/v1/transaction", transactionRouter)

app.get('/', (req, res, next) => {
  res.json({message:"Hello World"})
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})