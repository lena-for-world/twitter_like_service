const express = require('express');

const { isLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

// users 테이블에서 user를 찾아서, 그 user가 parameter로 들어온
// id를 팔로우시키는데 addFollowing 메서드를 이용한다
// 

router.post('/:id/profileMessage', isLoggedIn, async(req, res, next) => {
    try {
        const {nick, message} = req.body;
        console.log(nick);
        console.log(message);
        const userId = req.params.id;
        if(userId) {
            const user = await User.findOne({ where: { id: userId }});
            if(user) {
                    user.update({
                        nick: nick,
                        statusMessage: message,
                    });
                }
                res.redirect('/');
        } else {
            res.status(404).send('no user');
        }
    } catch(error) {
        console.error(error);
        next(error);
    }
});

router.post('/:id/follow', isLoggedIn, async(req, res, next) => {
    try {
        const user = await User.findOne({ where: {id: req.user.id} , include: ['Followings'] });
        console.log(user);
        if (user) {
           // user의 following에 insert
            await user.addFollowings(parseInt(req.params.id, 10));
            res.send('success');
          } else {
            res.status(404).send('no user');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// id는 삭제할 following대상에 해당
router.post('/:id/unfollow', isLoggedIn, async(req, res, next) => {
    try {
        const user = await User.findOne({ where: {id: req.user.id } });
        if (user) {
            await user.removeFollowings(parseInt(req.params.id, 10));
            // const id = req.params.id;
            // let test = await user.destory(
            //     { where: {followingId: id} }
            // );
            // console.log(test);
            res.send('success');
          } else {
            res.status(404).send('no user');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;