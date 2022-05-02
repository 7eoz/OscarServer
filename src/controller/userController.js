const User = require('../models/User');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function passwordValidation(password) {
	if (password.length < 8) {
		return 'Password must be at least 8 characters long';
	} else if (!password.match(/[a-zA-Z]/g)) {
		return 'Password must contain at least one letter';
	} else if (!password.match(/[0-9]/g)) {
		return 'Password must contain at least one number';
	} else {
		return 'OK';
	}
}

function generateToken(id) {
	// console.log(process.env.JWT_SECRET);
	process.env.JWT_SECRET = Math.random().toString(36).slice(-20);
	// console.log(process.env.JWT_SECRET);
	const token = jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: 82800, //Token expires in 24 hours
	});
	console.log(token);
	return token;
}

module.exports = {
	async listAllUsers(req, res) {
		const users = await User.findAll({
			order: [['name', 'ASC']],
		}).catch((error) => {
			res.status().json({ msg: 'Request failure', error });
		});
		if (users) res.status(200).json(users);
		else res.status(404).json({ msg: 'Users not found' });
	},

	async searchUserByEmail(req, res) {
		const email = req.body.email;
		if (!email) res.status(400).json({ msg: 'Email is empty' });
		const Op = Sequelize.Op;
		const user = await User.findAll({
			where: { email: { [Op.like]: `%${email}%` } },
		});
		console.log(email);
		if (user) {
			if (user == '') res.status(404).json({ msg: 'User not found' });
			else res.status(200).json({ user });
		} else {
			res.status(404).json({ msg: 'User not found' });
		}
	},

	async createUser(req, res) {
		const { name, email, password_hash } = req.body;
		if (!name || !email || !password_hash) {
			res.status(400).json({
				msg: 'Missing parameters',
			});
		}

		const passwordValid = passwordValidation(password_hash);
		if (passwordValid !== 'OK') {
			res.status(400).json({ msg: passwordValid });
		}

		const isUserNew = await User.findOne({
			where: { email: email },
		});
		if (isUserNew) {
			res.status(403).json({ msg: 'User already exists' });
		} else {
			//calculate password hash
			const salt = bcrypt.genSaltSync(12);
			const hash = bcrypt.hashSync(password_hash, salt);

			const user = await User.create({
				name,
				email,
				password_hash: hash,
			}).catch((error) => {
				res
					.status(500)
					.json({ msg: "Wasn't possible to to insert data", error });
			});
			if (user) res.status(201).json({ msg: 'User created' });
			else res.status(404).json({ msg: 'User not created' });
		}
	},

	async auth(req, res) {
		const email = req.body.email;
		const password_hash = req.body.password_hash;
		if (!email || !password_hash) {
			res.status(400).json({
				msg: 'Missing parameters',
			});
		}
		try {
			const user = await User.findOne({
				where: { email: email },
			});
			if (!user) {
				res.status(404).json({ msg: 'Invalid user or password.' });
			} else {
				if (bcrypt.compareSync(password_hash, user.password_hash)) {
					const token = generateToken(user.id);
					res.status(200).json({ msg: 'User authenticated', token });
				} else {
					res.status(404).json({ msg: 'Invalid user or password.' });
				}
			}
		} catch (error) {
			res.status(500).json({ msg: 'Error on authentication', error });
		}
	},
};
