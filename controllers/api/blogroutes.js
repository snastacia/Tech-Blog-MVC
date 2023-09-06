const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE new blog post
router.post('/', withAuth, async (req, res) => {
    try {
        const newBlog = await Blog.create({
            blog_title: req.body.blog_title,
            blog_description: req.body.blog_description,
            user_id: req.session.user_id
        });

        res.status(200).json(newBlog);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE blog post 
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedBlog = await Blog.update(
            {
                blog_title: req.body.blog_title,
                blog_description: req.body.blog_description,
            },
            {
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id,
                },
            });
        if (!updatedBlog) {
            res.status(404).json({ message: 'No blog found with this id.' });
            return;
        }
        res.status(200).json()
    } catch (err) {
        return res.status(500).json(err);
    }
});

// DELETE blog post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletedBlog = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!deletedBlog) {
            res.status(404).json({ message: 'No blog found with this id.' });
            return;
        }
        return res.status(200).json(deletedBlog);
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;