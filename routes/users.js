const router = require('express').Router();
const {
  getUsers,
  getUserId,
  getUserInfo,
  editUserInfo,
  editUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:userId', getUserId);
router.patch('/me', editUserInfo);
router.patch('/me/avatar', editUserAvatar);

module.exports = router;
