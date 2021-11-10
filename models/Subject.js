module.exports = (sequelize, DataTypes) => {
    const Subject = sequelize.define('Subject', {
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            },
        },
    }, {
        tableName: 'subjects'
    });

    Subject.associate = models => {
        Subject.belongsToMany(models.User, {
            through: 'user_subject'
        });
    }

    return Subject;
};
