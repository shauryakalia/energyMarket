'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.addColumn(
      'Buyers', // name of Source model
      'userId', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // name of Target model
          key: 'userId', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
    .then(() => {
      return queryInterface.addColumn(
        'Sellers', // name of Source model
        'userId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users', // name of Target model
            key: 'userId', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
    })
    .then(() => {
      queryInterface.addConstraint('Buyers', ['userId'], {
        type: 'unique',
        name: 'unique_buyers_userId'
      });
    })
    .then(() => {
      queryInterface.addConstraint('Sellers', ['userId'], {
        type: 'unique',
        name: 'unique_sellers_userId'
      });
    })
    .then(() => {
      return queryInterface.addColumn(
        'RPPs', // name of Source model
        'buyerId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Buyers', // name of Target model
            key: 'userId', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
    })
    .then(() => {
      return queryInterface.addColumn(
        'RPPs', // name of Source model
        'sellerId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Sellers', // name of Target model
            key: 'userId', // key in Target model that we're referencing
            allowNull: true
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
    })
    .then(() => {
      return queryInterface.addColumn(
        'RPPs', // name of Source model
        'ISOzoneId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Zones', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
    })
    .then(() => {
      return queryInterface.addColumn(
        'RPPs', // name of Source model
        'RECId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'RECs', // name of Target model
            key: 'id', // key in Target model that we're referencing
            allowNull: true
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
    })
    .then(() => {
      return queryInterface.addColumn(
        'Bids', // name of Source model
        'RPPId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'RPPs', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
    })
    .then(() => {
      return queryInterface.addColumn(
        'Bids', // name of Source model
        'sellerId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Sellers', // name of Target model
            key: 'userId', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
    })
    .then(() => {
      return queryInterface.addColumn(
        'Transactions', // name of Source model
        'RPPId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'RPPs', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
    })
    .then(() => {
      return queryInterface.addColumn(
        'Transactions', // name of Source model
        'fromAdminId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users', // name of Target model
            key: 'userId', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
    })
    .then(() => {
      return queryInterface.addColumn(
        'Transactions', // name of Source model
        'toSellerId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Sellers', // name of Target model
            key: 'userId', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.removeColumn(
      'Buyers', // name of Source model
      'userId' // key we want to remove
    )
    .then(() => {
      return queryInterface.removeColumn(
        'Sellers', // name of Source model
        'userId' // key we want to remove
      );
    })
    .then(() => {
      return queryInterface.removeColumn(
        'RPPs', // name of Source model
        'buyerId' // key we want to remove
      );
    })
    .then(() => {
      return queryInterface.removeColumn(
        'RPPs', // name of Source model
        'ISOzoneId' // key we want to remove
      );
    })
    .then(() => {
      return queryInterface.removeColumn(
        'RPPs', // name of Source model
        'RECId' // key we want to remove
      );
    })
    .then(() => {
      return queryInterface.removeColumn(
        'Bids', // name of Source model
        'RPPId' // key we want to remove
      );
    })
    .then(() => {
      return queryInterface.removeColumn(
        'Bids', // name of Source model
        'sellerId' // key we want to remove
      );
    })
    .then(() => {
      return queryInterface.removeColumn(
        'Transactions', // name of Source model
        'RPPId' // key we want to remove
      );
    })
    .then(() => {
      return queryInterface.removeColumn(
        'Transactions', // name of Source model
        'fromAdminId' // key we want to remove
      );
    })
    .then(() => {
      return queryInterface.removeColumn(
        'Transactions', // name of Source model
        'toSellerId' // key we want to remove
      );
    });
  }
};