const user = require('./user');
const post = require('./post');

//create associations
user.hasMany (post, {
    foreignKey: 'user_id'
});

post.belongsTo(user, {
    foreignKey: 'user_id',
});

module.exports = { user, post };
