const crypto = require('crypto');
const { User } = require('../models');
const ErrorResponse = require('../utils/errorResponse');


exports.register = async (request, response, next) => {
    const { registration_number, password } = request.body;

    await User.create({
        registration_number,
        password,
        role: 'student'
    });

    response.status(statusCode).json({
        success: true,
        message: 'User created successfully'
    });
};

exports.login = async (request, response, next) => {
    const { registration_number, password } = request.body;

    if (!registration_number || !password) {
        return next(new ErrorResponse("Please provide registration number and password", 400));
    }

    try {
        const user = await User.findOne({ where: { registration_number } });

        if (!user) {
            return next(new ErrorResponse("Invalid Credentials", 401));
        }

        const isMatch = await user.verifyPassword(password);

        if (!isMatch) {
            return next(new ErrorResponse("Invalid Credentials", 401));
        }

        sendToken(user, 200, response);

    } catch (error) {
        next(error);
    }

};

const sendToken = (user, statusCode, response) => {
    const token = user.getSignedToken();
    response.status(statusCode).json({ success: true, token });
};