

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        userId: 1,
        email: 'admin@verdeblocks.com',
        password: '$2a$10$lc7Tu7KrCcE18HI1xFPHu./X40J41GrWq/nptPa6QhnQIMjfrYQue',
        role: 'admin',
        createdAt : new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
