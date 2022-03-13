const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.send('it is posts');
});

router.get('/abc', (req, res) => {
    res.send('it is specific posts');
});

module.exports = router;