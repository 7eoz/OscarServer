const Sequelize = require('sequelize');

class User extends Sequelize.Model {
	static init(sequelize) {
		super.init(
			{
				name: Sequelize.STRING,
				email: Sequelize.STRING,
				password_hash: Sequelize.STRING,
			},
			{
				sequelize,
			}
		);
	}
	// static associate(models) {
	//     this.hasMany(models.User)
	// }
}

module.exports = User;
