const { User, Subject, sequelize } = require("../models");
const Sequelize = require('sequelize');

// only admin include search through registration number
exports.getResults = async (request, response, next) => {
    const users = await User.findAll({
        attributes: ['id', 'name'],
        where: {
            role: {
                [Sequelize.Op.not]: 'admin'
            }
        },
        include: [
            {
                model: Subject,
                required: true
            }
        ]
    });

    response.status(200).json({
        success: true,
        users: JSON.stringify(users),
    });
}

exports.getAllStudents = async (request, response, next) => {
    const users = await User.findAll({
        attributes: ['id', 'name'],
        where: {
            role: {
                [Sequelize.Op.not]: 'admin'
            }
        }
    });

    response.status(200).json({
        success: true,
        users: JSON.stringify(users),
    });
}

// only admin
exports.addResult = (request, response, next) => {
    const result = request.body();

    // add the subject wise results to the user;

    response.status(200).json({
        success: true,
        data: "You got access to the private data in this route",
    });
}

// only admin
exports.deleteResult = (request, response, next) => {
    const { query, params } = request;

    console.log(query, params);
    response.status(200).json({
        success: true,
        data: "You got access to the private data in this route",
    });
}

// only admin
exports.updateResult = (request, response, next) => {
    const result = request.body();

    console.log(result)

    response.status(200).json({
        success: true,
        data: "You got access to the private data in this route",
    });
}


// only student
exports.getMyResult = async (request, response, next) => {
    const { user } = request;

    const userData = await user.reload({
        include: [
            {
                model: Subject,
                attributes: ['code', 'name']
            }
        ],
    });

    response.status(200).json({
        success: true,
        userData: JSON.stringify(userData),
    });
}