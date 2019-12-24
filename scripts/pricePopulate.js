
/** ********************** Require node modules ************************ */
const Excel = require('exceljs');
const Path = require('path');
const { Price } = require('../dbconnection');

const wb = new Excel.Workbook();
const filePath = Path.join(__dirname, '../files/out.csv');
wb.csv.readFile(filePath)
  .then(() => {
    const sh = wb.getWorksheet('sheet1');
    const entries = [];
    sh.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber > 1) {
        const priceRow = {
          shape: row.values[1],
          time: row.values[2],
          contract: row.values[3],
          value: row.values[4],
          loadZone: row.values[5],
          month: row.values[6],
          year: row.values[7],
        };
        entries.push(priceRow);
      }
    });
    Price.bulkCreate(entries).then(() => {
      console.log('Price Table populated');
      process.exit();
    }).catch((error) => {
      console.log('Error while storing in DB', error);
      process.exit(1);
    });
  })
  .catch((error) => {
    console.log('Error', error);
    process.exit(1);
  });
