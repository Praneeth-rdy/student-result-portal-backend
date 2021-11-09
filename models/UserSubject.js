module.exports = (sequelize, DataTypes) => {
    const UserSubject = sequelize.define('user_subject', {
        semester_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            },
        },
        marks: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            },
        },
        max_marks: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            },
        },
        remark: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isIn: [['pass', 'fail']]
            }
        }
    }, {
        tableName: 'user_subject'
    });

    return UserSubject;
};
