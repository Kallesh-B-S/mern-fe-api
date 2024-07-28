const express = require('express')
const router = express.Router();

router.get('/ping', (req, res) => {
    res.json("Pong")
})

router.get('/pong', (req, res) => {
    res.json("Ping")
})

module.exports = router;