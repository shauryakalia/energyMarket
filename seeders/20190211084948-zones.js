
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Zones', [
      {
        id: 1,
        ISO: 'PJM',
        state: 'PJM WEST',
        EDC: '',
        loadZone: 'PJMWEST',
        ICEdescription: 'PJM West Hub',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        ISO: 'PJM',
        state: 'PJM EAST',
        EDC: '',
        loadZone: 'PJMEAST',
        ICEdescription: 'PJM East Hub',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        ISO: 'PJM',
        state: 'Pennsylvania',
        EDC: 'PPL Electric Utlities',
        loadZone: 'PPL',
        ICEdescription: 'PJM PPL DA',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        ISO: 'PJM',
        state: 'Pennsylvania',
        EDC: 'PA Electric Company',
        loadZone: 'PENELEC',
        ICEdescription: 'PJM PENELEC DA',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        ISO: 'PJM',
        state: 'Pennsylvania',
        EDC: 'Metropolitan Edison Company',
        loadZone: 'METED',
        ICEdescription: 'PJM METED DA',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        ISO: 'PJM',
        state: 'Pennsylvania',
        EDC: 'Allegheny Power Systems',
        loadZone: 'APS',
        ICEdescription: 'PJM APS DA',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        ISO: 'PJM',
        state: 'Pennsylvania',
        EDC: 'PECO Energy',
        loadZone: 'PECO',
        ICEdescription: 'PJM PECO DA',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        ISO: 'PJM',
        state: 'Pennsylvania',
        EDC: 'Duquesne Light',
        loadZone: 'DUQ',
        ICEdescription: 'PJM Duquesne DA',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        ISO: 'PJM',
        state: 'New Jersey',
        EDC: 'Jersey Central Power and Light Company',
        loadZone: 'JCPL',
        ICEdescription: 'PJM JCPL Zone DA',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        ISO: 'PJM',
        state: 'New Jersey',
        EDC: 'Atlantic City Electric Company',
        loadZone: 'AECO',
        ICEdescription: 'PJM AECO DA',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        ISO: 'PJM',
        state: 'New Jersey',
        EDC: 'Public Service Electric and Gas Company',
        loadZone: 'PSEG',
        ICEdescription: 'PJM PSEG Zone DA',  
        createdAt : new Date(),
        updatedAt: new Date() 
      },
      {
        id: 12,
        ISO: 'PJM',
        state: 'Delaware',
        EDC: 'Delmarva Power and Light Company',
        loadZone: 'DPL',
        ICEdescription: 'PJM DPL DA',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        ISO: 'PJM',
        state: 'Maryland',
        EDC: 'Baltimore Gas and Electric Company',
        loadZone: 'BGE',
        ICEdescription: 'PJM BGE DA',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 14,
        ISO: 'PJM',
        state: 'Maryland',
        EDC: 'Delmarva Power and Light Company',
        loadZone: 'DPL',
        ICEdescription: 'PJM DPL DA',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 15,
        ISO: 'PJM',
        state: 'Maryland',
        EDC: 'Allegheny Power Systems',
        loadZone: 'APS',
        ICEdescription: 'PJM APS DA',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 16,
        ISO: 'PJM',
        state: 'Virginia',
        EDC: 'Allegheny Power Systems',
        loadZone: 'APS',
        ICEdescription: 'PJM APS DA',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 17,
        ISO: 'PJM',
        state: 'Virginia',
        EDC: 'Delmarva Power and Light Company',
        loadZone: 'DPL',
        ICEdescription: 'PJM DPL DA',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 18,
        ISO: 'PJM',
        state: 'Virginia',
        EDC: 'Dominion',
        loadZone: 'DOM',
        ICEdescription: 'PJM DOM DA',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 19,
        ISO: 'PJM',
        state: 'Ohio',
        EDC: 'Dayton Power and Light Company',
        loadZone: 'DAY',
        ICEdescription: 'PJM DAY DA',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 20,
        ISO: 'PJM',
        state: 'Ohio',
        EDC: 'Duke Energy Ohio and Kentucky',
        loadZone: 'DEOK',
        ICEdescription: 'PJM DEOK DA',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 21,
        ISO: 'PJM',
        state: 'Illinois',
        EDC: 'ComEd',
        loadZone: 'COMED',
        ICEdescription: 'PJM ComEd DA',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 22,
        ISO: 'PJM',
        state: 'Kentucky',
        EDC: 'Duke Energy Ohio and Kentucky',
        loadZone: 'DEOK',
        ICEdescription: 'PJM DEOK DA',  
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 23,
        ISO: 'ISO NE',
        state: 'Maine',
        EDC: 'Central Maine Power',
        loadZone: 'Maine',
        ICEdescription: 'ISO-NE Maine DA',  
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 24,
        ISO: 'ISO NE',
        state: 'Maine',
        EDC: 'Bangor Hydro Electric',
        loadZone: 'Maine',
        ICEdescription: 'ISO-NE Maine DA',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 25,
        ISO: 'ISO NE',
        state: 'New Hampshire',
        EDC: 'Northeast Utilities',
        loadZone: 'NewHampshire',
        ICEdescription: 'ISO-NE New Hampshire DA',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 26,
        ISO: 'ISO NE',
        state: 'New Hampshire',
        EDC: 'National Grid',
        loadZone: 'NewHampshire',
        ICEdescription: 'ISO-NE New Hampshire DA',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 27,
        ISO: 'ISO NE',
        state: 'Massachusetts',
        EDC: 'National Grid',
        loadZone: 'SEMass',
        ICEdescription: 'ISO-NE SE-Mass DA',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 28,
        ISO: 'ISO NE',
        state: 'Massachusetts',
        EDC: '',
        loadZone: 'NEMassBost',
        ICEdescription: 'ISO-NE NE-Mass DA',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 29,
        ISO: 'ISO NE',
        state: 'Connecticut',
        EDC: 'Northeast Utilities',
        loadZone: 'Connecticut',
        ICEdescription: 'ISO-NE Con DA',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 30,
        ISO: 'ISO NE',
        state: 'Connecticut',
        EDC: 'United Illuminating',
        loadZone: 'Connecticut',
        ICEdescription: 'ISO-NE Con DA',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 31,
        ISO: 'ISO NE',
        state: 'Rhode Island',
        EDC: 'National Grid',
        loadZone: 'RhodeIsland',
        ICEdescription: 'ISO-NE RI DA',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 32,
        ISO: 'CAISO',
        state: 'California',
        EDC: 'SDG&E',
        loadZone: 'SP15',
        ICEdescription: 'SP15 DA',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 33,
        ISO: 'CAISO',
        state: 'California',
        EDC: 'PG&E',
        loadZone: 'NP15',
        ICEdescription: 'NP15 DA',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 34,
        ISO: 'CAISO',
        state: 'California',
        EDC: 'SCE',
        loadZone: 'SP15',
        ICEdescription: 'SP15 DA',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 35,
        ISO: 'ISO NE',
        state: 'Nepool',
        EDC: '',
        loadZone: 'Nepool',
        ICEdescription: 'ISO NE Nepool Hub',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 36,
        ISO: 'ERCOT',
        state: 'Texas',
        EDC: 'Houston',
        loadZone: 'Houston',
        ICEdescription: 'ERCOT Houston',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 37,
        ISO: 'ERCOT',
        state: 'Texas',
        EDC: 'North',
        loadZone: 'North',
        ICEdescription: 'ERCOT North',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 38,
        ISO: 'ERCOT',
        state: 'Texas',
        EDC: 'South',
        loadZone: 'South',
        ICEdescription: 'ERCOT South',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 39,
        ISO: 'ERCOT',
        state: 'Texas',
        EDC: 'West',
        loadZone: 'West',
        ICEdescription: 'ERCOT West',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 40 ,
        ISO: 'NYISO',
        state: 'New York',
        EDC: 'Zone A',
        loadZone: 'Zone A',
        ICEdescription: 'New York A',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 41 ,
        ISO: 'NYISO',
        state: 'New York',
        EDC: 'Zone B',
        loadZone: 'Zone B',
        ICEdescription: 'New York B',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 42 ,
        ISO: 'NYISO',
        state: 'New York',
        EDC: 'Zone C',
        loadZone: 'Zone C',
        ICEdescription: 'New York C',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 43 ,
        ISO: 'NYISO',
        state: 'New York',
        EDC: 'Zone D',
        loadZone: 'Zone D',
        ICEdescription: 'New York D',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 44 ,
        ISO: 'NYISO',
        state: 'New York',
        EDC: 'Zone E',
        loadZone: 'Zone E',
        ICEdescription: 'New York E',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 45 ,
        ISO: 'NYISO',
        state: 'New York',
        EDC: 'Zone F',
        loadZone: 'Zone F',
        ICEdescription: 'New York F',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 46 ,
        ISO: 'NYISO',
        state: 'New York',
        EDC: 'Zone G',
        loadZone: 'Zone G',
        ICEdescription: 'New York G',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 47 ,
        ISO: 'NYISO',
        state: 'New York',
        EDC: 'Zone I',
        loadZone: 'Zone I',
        ICEdescription: 'New York I',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 48 ,
        ISO: 'NYISO',
        state: 'New York',
        EDC: 'Zone J',
        loadZone: 'Zone J',
        ICEdescription: 'New York J',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 49 ,
        ISO: 'NYISO',
        state: 'New York',
        EDC: 'Zone K',
        loadZone: 'Zone K',
        ICEdescription: 'New York K',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 50 ,
        ISO: 'PJM',
        state: 'Washington DC',
        EDC: 'Potomac Electric Power Company',
        loadZone: 'PEPCO',
        ICEdescription: 'PJM PEPCO',
        createdAt : new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Zones', null, {});
  }
};
