export const errorHandler = (err, req, res, next) => {
    /* set default status code and message */
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong!";
    console.error(err.stack);
    res.status(statusCode).json({ status: "error", message })};