const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utils/auth');


// CREATE new comment
router.post('/blog/:id/comments', withAuth, async (req, res) => {
    try {
        const newComment = await Comments.create({
            comment_description: req.body.comment_description,
            user_id: req.session.user_id,
            blog_id: req.params.id,
        });
        console.log(newComment);
        res.status(200).json(newComment);
    } catch (err) {
        res.status(500).json(err)
    }
   
});

// UPDATE comment
router.put('/comments/:id', withAuth, async (req, res) => {
    try {
        const updatedComment = await Comments.update({
            comment_description: req.body.comment_description,
        }, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!updatedComment) {
            res.status(404).json({ message: 'Comment not found' });
            return;
        }

        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE comment
router.delete('/comments/:id', withAuth, async (req, res) => {
    try {
        const deletedComment = await Comments.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!deletedComment) {
            res.status(404).json({ message: 'Comment not found' });
            return;
        }

        res.status(200).json(deletedComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;