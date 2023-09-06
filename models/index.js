const User = require('./user');
const Blog = require('./blog');
const Comments = require('./Comments');

// Blog belongs to User
Blog.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

// User has many blogs 
User.hasMany(Blog, { foreignKey: 'user_id', onDelete: 'CASCADE' });

// Blog has many comments
Blog.hasMany(Comments, { foreignKey: 'blog_id', onDelete: 'CASCADE' });

// comments belong to user
Comments.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });


module.exports = {User, Blog, Comments}