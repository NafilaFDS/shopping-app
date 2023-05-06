const express = require('express');

const itemController = require('./controllers/item.controller');
const userController = require('./controllers/user.controller');

const { createItem, getItems, updateItem, deleteItem } = itemController
const { createUser, login, deleteUser, getUser, updateUser } = userController
const router = express.Router();

router.use((req, res, next) => {
	console.log('ip address:', req.ip);
	next();
});

//------------item routers---------------
router.post('/create-item', createItem);
router.post('/get-items', getItems);
router.post('/update-item', updateItem);
router.get('/delete-item/:itemId', deleteItem);

//-----------user routers-------------
router.post('/create-user', createUser);
router.post('/login', login);
router.get('/delete-user/:userId', deleteUser);
router.post('/get-users', getUser);
router.post('/update-user', updateUser);

module.exports = router;