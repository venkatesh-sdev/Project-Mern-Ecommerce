
const sendToken = (user, statusCode, res) => {
    const token = user.getJsonToken();

    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    res.cookie('token', token, options)
        .status(statusCode)
        .json({
            success: true,
            message: "User Registration Success",
            user,
            token
        })
}

module.exports = sendToken;