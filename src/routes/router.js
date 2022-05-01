const express = require('express');
const userRouter = require('./userRouter');
const router = express.Router();

router.get('/', (req, res) => {
	res.send("It's working!");
});

router.use('/users', userRouter);

module.exports = router;
