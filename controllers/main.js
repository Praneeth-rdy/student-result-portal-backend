const { User, Subject, sequelize } = require("../models");
const Sequelize = require('sequelize');
const ErrorResponse = require("../utils/errorResponse");

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
        attributes: ['registration_number', 'name'],
        where: {
            role: {
                [Sequelize.Op.not]: 'admin'
            }
        },
        include: [
            {
                model: Subject,
                attributes: ['id']
            }
        ]
    });

    response.status(200).json({
        success: true,
        users: JSON.stringify(users),
    });
}

// only admin
exports.addResult = (request, response, next) => {
    const { registration_number, result } = request.body;

    console.log(result)

    User.findOne({
        where: {
            registration_number
        }
    }).then(student => {
        for (let subjectData of result) {

            const { code, semester_number, marks, max_marks, remark } = subjectData;

            Subject.findOne({
                where: {
                    code: code
                }
            }).then((subject) => {
                student.addSubject(subject, {
                    through: {
                        semester_number,
                        marks,
                        max_marks,
                        remark,
                    }
                });
            })

        }
    });

    response.status(200).json({
        success: true,
        message: "Result Added Successfully",
    });
}

// only admin
exports.deleteResult = async (request, response, next) => {
    const { query: { registration_number } } = request;

    const subjects = await Subject.findAll();

    const student = await User.findOne({
        where: {
            registration_number,
            role: 'student'
        }
    });

    if (!student) {
        return next(new ErrorResponse("No student found with this reg number", 404))
    }

    for (let subject of subjects) {
        await student.removeSubject(subject);
        console.log(student.name)
    }

    response.status(200).json({
        success: true,
        message: `Successfully deleted the result of ${student.name}`,
    });
}

// only admin
exports.updateResult = (request, response, next) => {
    const { registration_number, result } = request.body;

    console.log(result)

    User.findOne({
        where: {
            registration_number
        }
    }).then(student => {
        for (let subjectData of result) {

            const { code, semester_number, marks, max_marks, remark } = subjectData;

            Subject.findOne({
                where: {
                    code: code
                }
            }).then((subject) => {
                student.addSubject(subject, {
                    through: {
                        semester_number,
                        marks,
                        max_marks,
                        remark,
                    }
                });
            })

        }
    });

    response.status(200).json({
        success: true,
        message: "Result Updated Successfully",
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

exports.getUserData = async (request, response, next) => {
    const { query: { registration_number } } = request;
    let userData = await User.findOne({
        where: { registration_number },
        include: [
            {
                model: Subject,
                attributes: ['code',]
            }
        ],
    });


    userData = JSON.parse(JSON.stringify(userData));

    let result = []

    for(let subject of userData.Subjects){
        result.push({
            code: subject.code,
            ...subject.user_subject
        });
    }

    userData = {
        registration_number: userData.registration_number,
        name: userData.name,
        result
    }

    

    response.status(200).json({
        success: true,
        userData: JSON.stringify(userData),
    });
}