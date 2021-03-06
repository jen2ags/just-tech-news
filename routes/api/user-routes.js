const router = require('express').Router();
const { user, vote, post, comment } = require('../../models');

//GET api/Users
router.get('/', (req, res) => {
    //access our User model and run .findAll() method
    user.findAll({ 
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//GET /api/users/1
router.get('/:id', (req, res) => {
    user.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: post,
                attributes: ['id', 'title', 'post_url', 'created_at']
            },
            {
                model: comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: post,
                    attributed: ['title']
                }
            },
            {
                model: post,
                attributes: ['title'],
                through: vote,
                as: 'voted_posts'
            }
        ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//POST /api/users
router.post('/', (req,res) => {
    //expects {username: 'Lernato', email: 'lernatino@gmail.com', password: 'password1234'}
    user.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/login', (req,res) => {
    // Query operation
    //expects {email: "lernantino@gmail.com", password: 'password1234'}
    user.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that email address!'});
            return;
        }
       // res.json({ user: dbUserData});

        //verify user
        const validPassword = dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
});

//PUT /api/users/1
router.put('/:id', (req, res) => {
    //expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

    //if req.body has exact key/value pairs to match the model, you can just use 'req.body' instead
    user.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//DELETE /api/users/1
router.delete('/:id', (req, res) => {
    user.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;