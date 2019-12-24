'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('RECs', [
      {
        id: 1,
        state: 'New Jersey',
        RECType: 'Solar',
        year: 'RY 2018',
        value : 230,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        state: 'New Jersey',
        RECType: 'Solar',
        year: 'RY 2019',
        value : 231,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        state: 'New Jersey',
        RECType: 'Solar',
        year: 'RY 2020',
        value : 230,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        state: 'Pennsylvania',
        RECType: 'Solar',
        year: 'RY 2018',
        value : 14.5,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        state: 'Pennsylvania',
        RECType: 'Solar',
        year: 'RY 2019',
        value : 18,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        state: 'Pennsylvania',
        RECType: 'Solar',
        year: 'RY 2020',
        value : 20,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        state: 'Maryland',
        RECType: 'Solar',
        year: '2018',
        value : 16,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        state: 'Maryland',
        RECType: 'Solar',
        year: '2019',
        value : 19,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        state: 'Maryland',
        RECType: 'Solar',
        year: '2020',
        value : 20,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        state: 'DC',
        RECType: 'Solar',
        year: '2017',
        value : 350,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        state: 'DC',
        RECType: 'Solar',
        year: '2018',
        value : 360,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        state: 'DC',
        RECType: 'Solar',
        year: '2019',
        value : 370,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        state: 'Delaware',
        RECType: 'Solar',
        year: 'CY 2016',
        value : 8,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 14,
        state: 'Delaware',
        RECType: 'Solar',
        year: 'CY 2017',
        value : 9,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 15,
        state: 'Delaware',
        RECType: 'Solar',
        year: 'CY 2018',
        value : 11,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 16,
        state: 'Massachusetts',
        RECType: 'SREC I',
        year: '2018',
        value : 412,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 17,
        state: 'Massachusetts',
        RECType: 'SREC I',
        year: '2019',
        value : 380,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 18,
        state: 'Massachusetts',
        RECType: 'SREC I',
        year: '2020',
        value : 337,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 19,
        state: 'Massachusetts',
        RECType: 'SREC II',
        year: '2018',
        value : 335,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 20,
        state: 'Massachusetts',
        RECType: 'SREC II',
        year: '2019',
        value : 294,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 21,
        state: 'Massachusetts',
        RECType: 'SREC II',
        year: '2020',
        value : 275,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 22,
        state: 'Ohio',
        RECType: 'Ceritified Solar',
        year: '2018',
        value : 12,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 23,
        state: 'Ohio',
        RECType: 'Ceritified Solar',
        year: '2019',
        value : 12.75,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 24,
        state: 'Ohio',
        RECType: 'Ceritified Solar',
        year: '2020',
        value : 13,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 25,
        state: 'Texas',
        RECType: 'RECs Green-e',
        year: 'CAL 2018',
        value : 0.8,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 26,
        state: 'Texas',
        RECType: 'RECs Green-e',
        year: 'CAL 2019',
        value : 0.78,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 27,
        state: 'Texas',
        RECType: 'RECs Green-e',
        year: 'CAL 2020',
        value : 0.76,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 28,
        state: 'Texas',
        RECType: 'Compliance RECs',
        year: '2017',
        value : 0.75,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 29,
        state: 'Texas',
        RECType: 'Compliance RECs',
        year: '2018',
        value : 0.78,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 30,
        state: 'Texas',
        RECType: 'Compliance RECs',
        year: '2019',
        value : 0.75,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 31,
        state: 'Michigan',
        RECType: 'MI-RECs',
        year: '2018',
        value : 1.35,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 32,
        state: 'Michigan',
        RECType: 'MI-RECs',
        year: '2019',
        value : 1.85,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 33,
        state: 'Michigan',
        RECType: 'MI-RECs',
        year: '2020',
        value : 2.5,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 34,
        state: 'WECC',
        RECType: 'WECC REC',
        year: '2016',
        value : 1.5,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 35,
        state: 'WECC',
        RECType: 'WECC REC',
        year: '2017',
        value : 2,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 36,
        state: 'New Jersey',
        RECType: 'CLASS I',
        year: 'RY 2018',
        value : 6.3,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 37,
        state: 'New Jersey',
        RECType: 'CLASS I',
        year: 'RY 2019',
        value : 6.45,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 38,
        state: 'New Jersey',
        RECType: 'CLASS I',
        year: 'RY 2020',
        value : 6.7,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 39,
        state: 'New Jersey',
        RECType: 'CLASS II',
        year: 'RY 2019',
        value : 4,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 40,
        state: 'New Jersey',
        RECType: 'CLASS II',
        year: 'RY 2020',
        value : 5,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 41,
        state: 'New Jersey',
        RECType: 'CLASS II',
        year: 'RY 2021',
        value : 5.5,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 42,
        state: 'Pennsylvania',
        RECType: 'TIER I',
        year: 'RY 2018',
        value : 6.1,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 43,
        state: 'Pennsylvania',
        RECType: 'TIER I',
        year: 'RY 2019',
        value : 6.25,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 44,
        state: 'Pennsylvania',
        RECType: 'TIER I',
        year: 'RY 2020',
        value : 6.45,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 45,
        state: 'Pennsylvania',
        RECType: 'TIER II',
        year: 'RY 2018',
        value : 0.18,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 46,
        state: 'Pennsylvania',
        RECType: 'TIER II',
        year: 'RY 2019',
        value : 0.21,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 47,
        state: 'Pennsylvania',
        RECType: 'TIER II',
        year: 'RY 2020',
        value : 0.23,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 48,
        state: 'Delaware',
        RECType: 'TIER I',
        year: 'RY 2016',
        value : 5.6,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 49,
        state: 'Delaware',
        RECType: 'TIER I',
        year: 'RY 2017',
        value : 5.9,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 50,
        state: 'Delaware',
        RECType: 'TIER I',
        year: 'RY 2018',
        value : 6.05,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 51,
        state: 'Delaware',
        RECType: 'EXISTING',
        year: 'RY 2016',
        value : 1.5,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 52,
        state: 'DC',
        RECType: 'TIER I',
        year: '2018',
        value : 2.75,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 53,
        state: 'DC',
        RECType: 'TIER I',
        year: '2019',
        value : 3,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 54,
        state: 'DC',
        RECType: 'TIER I',
        year: '2020',
        value : 3.5,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 55,
        state: 'DC',
        RECType: 'TIER II',
        year: '2017',
        value : 0.8,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 56,
        state: 'DC',
        RECType: 'TIER II',
        year: '2018',
        value : 0.8,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 57,
        state: 'Maryland',
        RECType: 'TIER I',
        year: '2018',
        value : 5.15,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 58,
        state: 'Maryland',
        RECType: 'TIER I',
        year: '2019',
        value : 6.25,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 59,
        state: 'Maryland',
        RECType: 'TIER I',
        year: '2020',
        value : 6.45,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 60,
        state: 'Maryland',
        RECType: 'TIER II',
        year: '2016',
        value : 0.7,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 61,
        state: 'Maryland',
        RECType: 'TIER II',
        year: '2017',
        value : 0.8,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 62,
        state: 'Maryland',
        RECType: 'TIER II',
        year: '2018',
        value : 0.8,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 63,
        state: 'Ohio',
        RECType: 'Certified',
        year: '2018',
        value : 6,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 64,
        state: 'Ohio',
        RECType: 'Certified',
        year: '2019',
        value : 6.25,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 65,
        state: 'Ohio',
        RECType: 'Certified',
        year: '2020',
        value : 6.5,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 66,
        state: 'Illinois',
        RECType: 'ARES Wind',
        year: 'RY 2017',
        value : 0.7,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 67,
        state: 'Illinois',
        RECType: 'ARES Wind',
        year: 'RY 2018',
        value : 0.8,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 68,
        state: 'Illinois',
        RECType: 'ARES Wind',
        year: 'RY 2019',
        value : 0.9,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 69,
        state: 'Illinois',
        RECType: 'ARES Non-Wind',
        year: 'RY 2017',
        value : 0.45,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 70,
        state: 'Illinois',
        RECType: 'ARES Non-Wind',
        year: 'RY 2018',
        value : 0.55,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 71,
        state: 'Illinois',
        RECType: 'ARES Non-Wind',
        year: 'RY 2019',
        value : 0.45,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 72,
        state: 'VOLUNTARY and GREEN-e',
        RECType: 'MRO Green-e Wind',
        year: 'CAL 2018',
        value : 0.86,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 73,
        state: 'VOLUNTARY and GREEN-e',
        RECType: 'PNW Wind',
        year: 'BH 2017',
        value : 2,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 74,
        state: 'VOLUNTARY and GREEN-e',
        RECType: 'PNW Wind',
        year: 'CAL 2018',
        value : 2.5,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 75,
        state: 'VOLUNTARY and GREEN-e',
        RECType: 'National Green-e Any',
        year: 'G-e RY 2018',
        value : 0.65,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 76,
        state: 'VOLUNTARY and GREEN-e',
        RECType: 'National Green-e Any',
        year: 'G-e RY 2019',
        value : 0.7,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 77,
        state: 'VOLUNTARY and GREEN-e',
        RECType: 'National Green-e Wind',
        year: 'CAL 2018',
        value : 0.83,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 78,
        state: 'Massachusetts',
        RECType: 'CLASS I',
        year: '2018',
        value : 6.25,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 79,
        state: 'Massachusetts',
        RECType: 'CLASS I',
        year: '2019',
        value : 13,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 80,
        state: 'Massachusetts',
        RECType: 'CLASS I',
        year: '2020',
        value : 18,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 81,
        state: 'Massachusetts',
        RECType: 'CLASS II Waste',
        year: '2018',
        value : 7.5,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 82,
        state: 'Massachusetts',
        RECType: 'CLASS II Non-Waste',
        year: '2018',
        value : 26,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 83,
        state: 'Massachusetts',
        RECType: 'CLASS II Non-Waste',
        year: '2019',
        value : 27,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 84,
        state: 'Massachusetts',
        RECType: 'CLASS II Non-Waste',
        year: '2020',
        value : 27,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 85,
        state: 'Massachusetts',
        RECType: 'APS',
        year: '2018',
        value : 18.75,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 86,
        state: 'Massachusetts',
        RECType: 'APS',
        year: '2019',
        value : 19.25,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 87,
        state: 'Connecticut',
        RECType: 'CLASS I',
        year: '2018',
        value : 6.25,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 88,
        state: 'Connecticut',
        RECType: 'CLASS I',
        year: '2019',
        value : 13,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 89,
        state: 'Connecticut',
        RECType: 'CLASS I',
        year: '2020',
        value : 18,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 90,
        state: 'Connecticut',
        RECType: 'CLASS II',
        year: '2018',
        value : 4,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 91,
        state: 'Connecticut',
        RECType: 'CLASS II',
        year: '2019',
        value : 6.75,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 92,
        state: 'Rhode Island',
        RECType: 'New',
        year: '2018',
        value : 5.45,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 93,
        state: 'Rhode Island',
        RECType: 'New',
        year: '2019',
        value : 11.5,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 94,
        state: 'Rhode Island',
        RECType: 'New',
        year: '2020',
        value : 17.5,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 95,
        state: 'Rhode Island',
        RECType: 'Existing',
        year: '2018',
        value : 2,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 96,
        state: 'Maine',
        RECType: 'New',
        year: '2017',
        value : 3,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 97,
        state: 'Maine',
        RECType: 'New',
        year: '2018',
        value : 4,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 98,
        state: 'Maine',
        RECType: 'Existing',
        year: '2017',
        value : 0.6,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 99,
        state: 'Maine',
        RECType: 'Existing',
        year: '2018',
        value : 1.25,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 100,
        state: 'Maine',
        RECType: 'Existing',
        year: '2019',
        value : 1.75,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 101,
        state: 'New Hampshire',
        RECType: 'Class I',
        year: '2018',
        value : 6.25,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 102,
        state: 'New Hampshire',
        RECType: 'Class I',
        year: '2019',
        value : 12.75,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 103,
        state: 'New Hampshire',
        RECType: 'Class II',
        year: '2018',
        value : 10,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 104,
        state: 'New Hampshire',
        RECType: 'Class III',
        year: '2018',
        value : 15,
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
        id: 105,
        state: 'New Hampshire',
        RECType: 'Class IV',
        year: '2018',
        value : 27.5,
        createdAt : new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelawarelete('RECs', null, {});
  }
};
