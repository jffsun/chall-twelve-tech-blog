const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Id which post comment belongs to 
    post_id: {
        type: DataTypes.INTEGER,
        references : {
            model: 'post',
            key: 'id'
        },
    },
    // Id who wrote comment
    user_id: {
        type: DataTypes.INTEGER,
        references : {
          model: 'user',
          key: 'id'
        },
    },
  },
  {
    sequelize,
    // Allow timestamps to show when comment was created
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;