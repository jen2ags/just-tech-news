const router = require('express').Router();
const commentRoutes = require('./comment-routes');
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comment', commentRoutes);

module.exports = router;