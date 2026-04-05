const express = require('express');
const router = express.Router();

const {
    createLocalBooking,
    getLocalBookings,
    deleteLocalBooking
} = require('../controllers/LocalbookingController');

router.post('/', createLocalBooking);
router.get('/', getLocalBookings);
router.delete('/:id', deleteLocalBooking);

module.exports = router;