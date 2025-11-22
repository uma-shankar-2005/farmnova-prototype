const express = require('express');
const router = express.Router();
const {
    createChat,
    getChat,
    updateChat,
    deleteChat
} = require('../controllers/chatController');

router.post('/', createChat);
router.get('/:id', getChat);
router.put('/:id', updateChat);
router.delete('/:id', deleteChat);

module.exports = router;