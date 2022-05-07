const user = require('./user');
const post = require('./post');
const vote = require('./vote');
const { contentType } = require('express/lib/response');
const comment = require('./Comment');

//create associations
user.hasMany (post, {
    foreignKey: 'user_id'
});

post.belongsTo(user, {
    foreignKey: 'user_id',
});

comment.belongsTo(user, {
    foreignKey: 'user_id'
});

comment.belongsTo(post, {
    foreignKey: 'post_id'
});

user.belongsToMany(post, {
    through: vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

post.belongsToMany (user, {
    through: vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

vote.belongsTo(user, {
    foreignKey: 'user_id'
});

vote.belongsTo(post, {
    foreignKey: 'post_id'
});

user.hasMany(vote, {
    foreignKey: 'user_id'
});

post.hasMany(vote, {
    foreignKey: 'post_id'
});

comment.hasMany(comment, {
    foreignKey: 'user_id'
});

comment.hasMany(comment, {
    foreignKey: 'post_id'
});

module.exports = { user, post, vote, comment };
