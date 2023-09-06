const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./user')

// initialize Blog model (table) by extending off Sequelize's Model class 
class Blog extends Model {}

// set up fields and rules for Blog model
Blog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            primaryKey: true, 
            autoIncrement: true,
        },
        blog_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        blog_description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id',
            },
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'blog',
    }
);

module.exports = Blog;