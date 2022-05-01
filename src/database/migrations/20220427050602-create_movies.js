'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('movies', {
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
			genre: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			photo: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('movies');
	},
};
