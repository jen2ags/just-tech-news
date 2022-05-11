const router = require('express').Router();
const sequelize = require('../config/connection');
const { post, user, comment } = require('../models');

router.get('/', (req, res) => {
    post.findAll({
        attributes: [
            'id', 'post_url', 'title', 'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
            {
                model: comment,
                attributes: [ 
                    'id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                
                include: {
                    model: user,
                    attributes: ['username']
                }
            },
            {
                model: user,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        console.log(dbPostData[0]);
        res.render('homepage', dbPostData[0]);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;