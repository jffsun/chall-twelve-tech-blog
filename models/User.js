const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Import bcrypt to hash new user's password
const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
    };
  };

User.init(
    {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8],
        },
    },
    },
    {
    // Hooks to bcrypt hash a new user's password
    hooks: {
        // Before new user is created, their password is hashed with 10 salt rounds
        beforeCreate: async (newUserData) => {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
        },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
    }
);

module.exports = User;