const router = require('express').Router();
const { User } = require('../../models');

// CREATE new user 
router.post('/', async (req, res) => {
    try {
        console.log("receiving request to save user")
        const dbUserData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        console.log(dbUserData)

        req.session.save(() => {
            req.session.logged_in = true;
            req.session.user_id = dbUserData.id
            res.status(200).json(dbUserData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        if (!dbUserData) {
            res.status(400).json({ message: 'Incorrect username or password. Please try again!' });
            return;
        }

        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password. Please try again!' });
            return;
        }

        req.session.save(() => {
            req.session.logged_in = true;
            req.session.user_id = dbUserData.id
            res.status(200).json({ user: dbUserData, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Logout 
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;