'use stricts';

const express = require('express');
const router = express.Router();

const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Welcome to Node Store API [Final Version]",
        version: "2.0.0 "
    });
});

module.exports = router;