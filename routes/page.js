const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User } = require('../models');

const router = express.Router();

// router.use((req,res,next) => {
//     res.locals.user = req.user;
//     res.locals.follwerCount = 0;
//     res.locals.followingCount = 0;
//     res.locals.followerIdList = [];
//     next();
// });

router.get('/profile', isLoggedIn, (req,res) => {
    res.render('profile', {
        title: '내 정보 - NodeBird',
        user: req.user,
    });
});

router.get('/profileMessage', isLoggedIn, (req,res) => {
    res.render('profilemessage', {
        title: '내 정보 수정 - NodeBird',
        user: req.user,
    });
});

router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('join', {
        title: '회원가입 - NodeBird',
        user: req.user,
        joinError: req.flash('joinError'),
    });
});

// 수정
router.get('/', (req,res,next) => {
    Post.findAll({
         include: [{
            model: User,
            attributes: ['id', 'nick'],
        },
        {
            model: User,
            attributes: ['id', 'nick'],
            as: 'Liker',
       }
    ],
        order: [['createdAt', 'DESC']],
    })
    .then((posts) => {
        res.render('main', {
            title: 'NodeBird',
            twits: posts,
            user: req.user,
            loginError: req.flash('loginError'),
        });
    })
    .catch((error) => {
        console.error(error);
        next(error);
    });
});

module.exports = router;