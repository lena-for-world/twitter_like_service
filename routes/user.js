const express = require('express');

const { isLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

// users 테이블에서 user를 찾아서, 그 user가 parameter로 들어온
// id를 팔로우시키는데 addFollowing 메서드를 이용한다
// 
router.post('/:id/follow', isLoggedIn, async(req, res, next) => {
    try {
        const user = await User.findOne({ where: {id: req.user.id } });
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