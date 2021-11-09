const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        registration_number: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            },
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isIn: [['admin', 'student']]
            },
        },
    }, {
        tableName: 'users'
    });

    User.prototype.toString = function () {
        return this.username;
    }

    User.prototype.verifyPassword = async function (password) {
        return await bcrypt.compare(password, this.password);
    }

    User.prototype.getSignedToken = function () {
        return jwt.sign(
            { id: this.id },
            process.env.JWT_SECRET,
            // { expiresIn: process.env.JWT_EXPIRE }
        );
    }

    User.afterValidate(async (user, options) => {
        if (user.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            user.password = await await bcrypt.hash(user.password, salt);
        }
    });

    User.associate = models => {
        User.belongsToMany(models.Subject, {
            through: 'user_subject'
        });
    }

    return User;
};


