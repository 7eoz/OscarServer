'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert(
			'directors',
			[
				{
					id: '1',
					name: 'James Cameron',
				},
				{
					id: '2',
					name: 'Alfred Hitchcoc',
				},
				{
					id: '3',
					name: 'Tim Burton',
				},
				{
					id: '4',
					name: 'Steven Spielberg',
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('directors', null, {});
	},
};
