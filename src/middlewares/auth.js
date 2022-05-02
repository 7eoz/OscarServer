const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
	const token = req.headers['x-access-token'];
	if (!token) return res.status(401).json({ msg: 'Undefined token' });
	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).json({ msg: 'Token auth failure' });
		}
		req.userId = decoded.id;
		next();
	});
}

modue.exports = verifyJWT;
