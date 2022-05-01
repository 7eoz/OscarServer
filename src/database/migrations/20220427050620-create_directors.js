'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('directors', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('directors');
	},
};
