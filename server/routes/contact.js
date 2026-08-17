const express = require('express');
const router = express.Router();

const contactCtrl = require('../controllers/contactController');

router.post('/submit', contactCtrl.handleContactSubmission);
router.get('/', contactCtrl.getMessages);
router.put('/:id/status', contactCtrl.updateMessageStatus);
router.delete('/:id', contactCtrl.deleteMessage);

module.exports = router;