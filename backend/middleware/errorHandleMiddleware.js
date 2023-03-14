const errorHandler = async (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    const errorMessage = Object.values(err.errors).map(error => error.name === 'ValidatorError' && error.message)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? errorMessage : err.stack,
    })
}

module.exports = errorHandler;