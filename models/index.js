const user = require('./user');
const post = require('./post');
const vote = require('./vote');
const { contentType } = require('express/lib/response');
const User = require('./user');
const Post = require('./post');

//create associations
user.hasMany (post, {
    foreignKey: 'user_id'
});

post.belongsTo(user, {
    foreignKey: 'user_id',
});

user.belongsToMany(Post, {
    through: vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

post.belongsToMany (User, {
    through: vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

vote.belongsTo(User, {
    foreignKey: 'user_id'
});

vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(vote, {
    foreignKey: 'user_id'
});

Post.hasMany(vote, {
    foreignKey: 'post_id'
});

module.exports = { user, post, vote };
