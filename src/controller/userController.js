const User = require('../models/User');

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
};
