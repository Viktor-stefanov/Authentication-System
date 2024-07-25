const errorHandler = (err, req, res, next) => {
    console.log(err.stack); // Log the error stack
    res.status(500).json({
        message: err.message || "Internal server error",
    });
};
export default errorHandler;
