const router = require('express').Router();
const { Blog, Comments, User } = require('../models');
const withAuth = require('../utils/auth');

// GET all blog posts for homepage
router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            attributes: [
                'id',
                'blog_title',
                'blog_description',
                'date_created'
            ],
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comments,
                    attributes: [
                        'id',
                        'comment_description'
                    ],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ],
        });

        const blogs = blogData.map((blog) =>
            blog.get({ plain: true })
        );

        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET one blogpost 
router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comments,
                    attributes: [
                        'comment_description',
                        'date_created',
                    ],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
            ],
        });

        const blog = blogData.get({ plain: true });
        const can_edit = req.session.user_id === blog.user_id    
        res.render('blog', { blog, logged_in: req.session.logged_in, can_edit });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET one blog post, if user can edit will allow editing and deleting of the post
router.get('/blog/edit/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comments,
                    attributes: [
                        'comment_description',
                        'date_created',
                    ],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
            ],
        });
        
        const blog = blogData.get({ plain: true });

        const can_edit = req.session.user_id === blog.user_id    

        res.render('blog', { blog, logged_in: req.session.logged_in, can_edit });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET dashboard 
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            where: {
                user_id: req.session.user_id
            }
        });


        const blogs = blogData.map((blog) =>
            blog.get({ plain: true })
        );

        res.render('dashboard', { blogs, logged_in: true });
    } catch (err) {
        res.status(500).json(err);
    }
});

// login route
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});


module.exports = router;