const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

/* GET users listing. */
router.get('/', usersController.list);

/* GET user by id. */
router.get('/:id', usersController.find);

/* POST create user. */
router.post('/', usersController.create);

/* PUT update user by id. */
router.put('/:id', usersController.update);

/* DELETE user by id */
router.delete('/:id', usersController.destroy);

module.exports = router;
