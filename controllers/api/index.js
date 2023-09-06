const router = require('express').Router();
const userRoutes = require('./userroutes');
const blogRoutes = require('./blogroutes');
const commentsRoutes = require('./commentsroutes');

router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);
router.use('/comments', commentsRoutes);

module.exports = router;