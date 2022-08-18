const router = require('express').Router();
const {
  getUsers,
  getUserId,
  createUser,
  editUserInfo,
  editUserAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', getUserId);
router.post('/users', createUser);
router.patch('/users/me', editUserInfo);
router.patch('/users/me/avatar', editUserAvatar);

module.exports = router;
