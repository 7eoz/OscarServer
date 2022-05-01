'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert(
			'movies',
			[
				{
					id: '1',
					name: 'Piratas do Caribe',
					genre: 'Aventura',
					photo: 'http://wecodecorp.com.br/ufpr/imagens/piratas.jpeg',
				},
				{
					id: '2',
					name: 'Passageiros',
					genre: 'Ficção',
					photo: 'http://wecodecorp.com.br/ufpr/imagens/passageiros.jpeg',
				},
				{
					id: '3',
					name: 'La La Land',
					genre: 'Musical',
					photo: 'http://wecodecorp.com.br/ufpr/imagens/land.jpeg',
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('movies', null, {});
	},
};
