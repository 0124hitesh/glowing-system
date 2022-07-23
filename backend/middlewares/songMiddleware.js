// URL not found error
const invalidURL = (req, res, next) => {
    const error = new Error(`URL Not found - ${req.originalUrl}`)
    res.status(404);
    next(error)
} 

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: err.message
    })
}

module.exports = {invalidURL, errorHandler}