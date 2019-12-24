/*eslint-disable*/
/* ********************************* Import Node Modules ********************************* */
const Sequelize = require('sequelize');
const _ = require('lodash');
const moment = require('moment');

/* ********************************* Import Local Modules ********************************* */

const {
  Zone, RPP, REC, db,
} = require('../dbconnection');
const { dateHelper } = require('../helpers');

/* ********************************* Variable Listing ********************************* */
const rate = 1.15;
const mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const getDaysInMonth = function (month, year) {
  // Here January is 1 based
  // Day 0 is the last day in the previous month
  return new Date(year, month, 0).getDate();
  // Here January is 0 based
  // return new Date(year, month+1, 0).getDate();
};

function getBusinessDatesCount(startDate, endDate) {
  let count = 0;
  const curDate = startDate;
  while (curDate <= endDate) {
    const dayOfWeek = curDate.getDay();
    if (!((dayOfWeek == 6) || (dayOfWeek == 0))) count++;
    curDate.setDate(curDate.getDate() + 1);
  }
  return count;
}

module.exports = {
  getAllRPP: async (data, query) => {
    const { page, limit } = query;
    const selectQuery = { buyerId: data.id };

    const rppData = await RPP.findAndCountAll({
      where: selectQuery,
    });
    const pages = Math.ceil(rppData.count / limit);
    const offset = limit * (page - 1);

    const rpp = await RPP.findAll({
      attributes: ['id', 'deliveryTimeFrom', 'deliveryTimeTo', 'shape', 'volume', 'primaryPowerSource',
        'RECVolume', 'RECAttribute', 'initialResponseBy', 'timezone', 'totalEstimateEnergyValue', 'totalEstimateEnergyMonthlyValue',
        'totalEstimateRECValue', 'totalEstimateRECMonthlyValue', 'energyFee', 'RECFee', 'maxHourPeak', 'status', 'buyerId',
        'ISOzoneId', 'RECId', 'escrowReciepts', 'escrowDueBy', 'sellerRanking'],
      where: selectQuery,
      limit,
      offset,
      order: [
        ['id', 'ASC'],
      ],
      raw: true,
    });
    const res = [];
    let i = 0;
    for (i = 0; i < rpp.length; i += 1) {
      const zoneDetails = await Zone.find({
        attributes: ['ISO', 'state', 'EDC'],
        where: { id: rpp[i].ISOzoneId },
        raw: true,
      });
      let recDetails = 'not included';
      if (rpp[i].RECId) {
        recDetails = await REC.find({
          attributes: ['state', 'RECType', 'year'],
          where: { id: rpp[i].RECId },
          raw: true,
        });
      }
      _.set(rpp[i], 'zoneDetails', zoneDetails);
      _.set(rpp[i], 'recDetails', recDetails);
      res.push(rpp[i]);
    }
    const result = {
      res,
      count: rppData.count,
      pages,
    };
    return result;
  },

  estimateRPP: async (data) => {
    let totalEstimateEnergyMonthlyValue = 0;
    let totalEstimateRECMonthlyValue = 0;
    let weeklyOnpeakHours = 0;
    let weeklyOffpeakHours = 0;
    let dailyOnpeakHours = 0;
    let dailyOffpeakHours = 0;
    let weekendHour = 0;
    let onpeak = 0;
    let offpeak = 0;

    switch (data.shape) {
      case '24/7':
        weeklyOnpeakHours = 80;
        weeklyOffpeakHours = 88;
        dailyOnpeakHours = 16;
        dailyOffpeakHours = 8;
        weekendHour = 24;
        onpeak = 1;
        offpeak = 1;
        break;
      case 'ONPEAK':
        weeklyOnpeakHours = 80;
        weeklyOffpeakHours = 0;
        dailyOnpeakHours = 16;
        dailyOffpeakHours = 0;
        weekendHour = 0;
        onpeak = 1;
        break;
      case 'OFFPEAK':
        weeklyOnpeakHours = 0;
        weeklyOffpeakHours = 88;
        dailyOnpeakHours = 0;
        dailyOffpeakHours = 8;
        weekendHour = 24;
        offpeak = 1;
        break;
      case 'WORKPEAK':
        weeklyOnpeakHours = 40;
        weeklyOffpeakHours = 0;
        dailyOnpeakHours = 8;
        dailyOffpeakHours = 0;
        weekendHour = 0;
        onpeak = 1;
        break;
      case 'WORKPEAKOFFPEAK':
        weeklyOnpeakHours = 40;
        weeklyOffpeakHours = 88;
        dailyOnpeakHours = 8;
        dailyOffpeakHours = 8;
        weekendHour = 24;
        onpeak = 1;
        offpeak = 1;
        break;
      case 'ONPEAKOFFPEAK':
        weeklyOnpeakHours = 80;
        weeklyOffpeakHours = 88;
        dailyOnpeakHours = 16;
        dailyOffpeakHours = 8;
        weekendHour = 24;
        onpeak = 1;
        offpeak = 1;
        break;
      case 'INTERMITTENT':
        weeklyOnpeakHours = 80;
        weeklyOffpeakHours = 88;
        dailyOnpeakHours = 16;
        dailyOffpeakHours = 8;
        weekendHour = 24;
        onpeak = 1;
        offpeak = 1;
        break;
      default:
        break;
    }

    const totalWeeklyHour = weeklyOffpeakHours + weeklyOnpeakHours;
    let result = {};

    if (data.deliveryTimeFrom < data.deliveryTimeTo) {
      let recPrice = 0;
      let recValue = 0;

      // data.deliveryTimeFrom = 1559448000000;
      // data.deliveryTimeTo = 1562904000000;

      console.log("deliveryTimeFrom before offset", data.deliveryTimeFrom);
      console.log("deliveryTimeTo before offset", data.deliveryTimeTo);

      var now = moment(data.deliveryTimeTo);
      //var localOffset = now.utcOffset();
      now.tz(data.timezone);
      var centralOffset = now.utcOffset();
      var offset = centralOffset * 60000;
      console.log("offset", offset);

      data.deliveryTimeFrom += offset;
      data.deliveryTimeTo += offset;

      console.log("deliveryTimeFrom", data.deliveryTimeFrom);
      console.log("deliveryTimeTo", data.deliveryTimeTo);

      const totalWeeks = dateHelper.weeks(data.deliveryTimeFrom, data.deliveryTimeTo);
      if (totalWeeks < 4) {
        throw new Error('Delivery Period should atleast be 1 month long');
      }

      const startYear = new Date(data.deliveryTimeFrom).getFullYear();
      const startMonth = new Date(data.deliveryTimeFrom).getMonth();
      const endYear = new Date(data.deliveryTimeTo).getFullYear();
      const endMonth = new Date(data.deliveryTimeTo).getMonth();
      const endDate = new Date(data.deliveryTimeTo).getDate();

      console.log("startYear", startYear);
      console.log("startMonth", startMonth);
      console.log("endYear", endDate);
      console.log("endMonth", data.deliveryTimeTo);
      console.log("endDate", new Date(data.deliveryTimeTo));

      const timeline = [];
      timeline.push(data.deliveryTimeFrom);

      // timeline
      for (let currentYear = startYear; currentYear <= endYear; currentYear += 1) {
        for (let currentMonth = 0; (currentMonth <= 11); currentMonth += 1) {
          if (currentMonth <= startMonth && currentYear === startYear || currentMonth > endMonth && currentYear === endYear) {

          } else {
            let timepointer = new Date(Date.UTC(currentYear, currentMonth, '1', '0', '0', '0'));
            timepointer = timepointer.getTime();
            timeline.push(timepointer);
          }
        }
      }
      console.log("timeline", timeline);



      // const from = new Date(`${deliveryFrom.getFullYear()}-${deliveryFrom.getMonth()}-1`).getTime();

      // let toYear = 0;

      // if (deliveryFrom.getMonth() === 12) {
      //   toYear = deliveryTo.getFullYear() + 1;
      // } else {
      //   toYear = deliveryTo.getFullYear();
      // }

      // const to = new Date(`${toYear}-${deliveryTo.getMonth() + 1}-1`).getTime();

      const loadzone = await Zone.findOne({ attributes: ['loadZone'], where: { id: data.ISOzoneId } });
      const loadZone = String(loadzone.loadZone);
      let onpeakPrice = 0;
      let offpeakPrice = 0;
      let onpeakValue = 0;
      let offpeakValue = 0;

      // if (onpeak === 1) {
      //   const query = `SELECT MAX("value") FROM "Prices" WHERE "time" BETWEEN ${from} AND ${to}
      //     AND  "loadZone"='${loadZone}' AND "shape"='ONPEAK'`;
      //   onpeakPrice = await db.query(query, { type: Sequelize.QueryTypes.SELECT });
      //   onpeakValue = data.volume * onpeakPrice[0].max * rate * weeklyOnpeakHours * totalWeeks;
      // }
      // if (offpeak === 1) {
      //   const query = `SELECT MAX("value") FROM "Prices" WHERE "time" BETWEEN ${from} AND ${to}
      //     AND "shape"='OFFPEAK' AND "loadZone"='${loadZone}'`;
      //   offpeakPrice = await db.query(query, { type: Sequelize.QueryTypes.SELECT });
      //   offpeakValue = data.volume * offpeakPrice[0].max * rate * weeklyOffpeakHours * totalWeeks;
      // }

      // for (let temp = data.deliveryTimeFrom; temp <= data.deliveryTimeTo; temp = temp + 86400000) {

      //   let delYear = new Date(temp).getFullYear();
      //   let delMonth = mS[new Date(temp).getMonth()];

      // }

      // async.each(timeline, async function (timepointer, callback) {
      if (data.RECId) {
        recPrice = await REC.findOne({ attributes: ['value'], where: { id: data.RECId } });
      }
      for (const timepointer of timeline) {
        let totalDays;
        const curMon = new Date(timepointer).getMonth();
        const curYear = new Date(timepointer).getFullYear();
        const startTimestamp = (new Date(Date.UTC(curYear, curMon, new Date(timepointer).getDate(), '0', '0', '0'))).getTime();

        if (curMon === endMonth && curYear === endYear) {
          totalDays = endDate;
        } else {
          totalDays = getDaysInMonth(curMon + 1, curYear);
        }
        const endTimestamp = (new Date(Date.UTC(curYear, curMon, totalDays, '0', '0', '0'))).getTime();

        const curDate = new Date(timepointer).getDate();
        const billableDays = totalDays - curDate + 1;
        const billableWeekdays = getBusinessDatesCount(new Date(startTimestamp), new Date(endTimestamp));
        const billableWeekends = billableDays - billableWeekdays;
        console.log("curDate", curDate);
        console.log("billableWeekdays", billableWeekdays);
        console.log("billableWeekends", billableWeekends);

        if (onpeak === 1) {
          const query = `SELECT "value" FROM "Prices" WHERE "month"='${mS[curMon]}' AND "year"='${curYear}'
          AND "loadZone"='${loadZone}' AND "shape"='ONPEAK'`;
          onpeakPrice = await db.query(query, { type: Sequelize.QueryTypes.SELECT });
          onpeakValue += (data.volume * onpeakPrice[0].value * rate
            * dailyOnpeakHours * billableWeekdays);
          if (data.RECId && data.RECAmountType === "MATCHRPP") {
            recValue += (data.RECVolume * recPrice.value * rate
              * dailyOnpeakHours * billableWeekdays);
          }
        }
        if (offpeak === 1) {
          const query = `SELECT "value" FROM "Prices" WHERE "month"='${mS[curMon]}' AND "year"='${curYear}'
          AND "shape"='OFFPEAK' AND "loadZone"='${loadZone}'`;
          offpeakPrice = await db.query(query, { type: Sequelize.QueryTypes.SELECT });
          offpeakValue += (data.volume * offpeakPrice[0].value
            * rate * ((dailyOffpeakHours * billableWeekdays)
              + (weekendHour * billableWeekends)));
          if (data.RECId && data.RECAmountType === "MATCHRPP") {
            recValue += (data.RECVolume * recPrice.value * rate *
              ((dailyOffpeakHours * billableWeekdays)
                + (weekendHour * billableWeekends)));
          }
        }

        // callback();
        // }, function (err) {
        //   console.log("done");
        // });
      }

      if (data.RECId && data.RECAmountType === "SPECIFIC") {
        recValue = data.RECVolume * recPrice.value * rate;
      }
      console.log('onpeakValue', onpeakValue);
      console.log('offpeakValue', offpeakValue);
      const totalEstimateEnergyValue = onpeakValue + offpeakValue;
      const totalEstimateRECValue = recValue;
      const months = dateHelper.monthDiff(data.deliveryTimeFrom, data.deliveryTimeTo);
      if (months === 0) {
        totalEstimateEnergyMonthlyValue = totalEstimateEnergyValue;
        totalEstimateRECMonthlyValue = totalEstimateRECValue;
      } else {
        totalEstimateEnergyMonthlyValue = totalEstimateEnergyValue / months;
        totalEstimateRECMonthlyValue = totalEstimateRECValue / months;
      }
      const totalVolume = data.volume * totalWeeklyHour * totalWeeks;
      result = {
        totalEstimateEnergyValue,
        totalEstimateEnergyMonthlyValue,
        totalEstimateRECValue,
        totalEstimateRECMonthlyValue,
        totalVolume,
      };
      return result;
    }
    throw new Error('DeliveryTimeFrom must be less than DeliveryTimeTo');
  },

  createRPP: async (data) => {
    if (data.initialResponseBy > data.deliveryTimeFrom - 86400000) {
      throw new Error('InitialResponseBy can at max be 48hours before DeliveryTimeFrom');
    } else {
      let weeklyOnpeakHours = 0;
      let weeklyOffpeakHours = 0;
      switch (data.shape) {
        case '24/7':
          weeklyOnpeakHours = 80;
          weeklyOffpeakHours = 88;
          break;
        case 'ONPEAK':
          weeklyOnpeakHours = 80;
          weeklyOffpeakHours = 0;
          break;
        case 'OFFPEAK':
          weeklyOffpeakHours = 88;
          weeklyOnpeakHours = 0;
          break;
        case 'WORKPEAK':
          weeklyOnpeakHours = 40;
          weeklyOffpeakHours = 0;
          break;
        case 'WORKPEAKOFFPEAK':
          weeklyOnpeakHours = 40;
          weeklyOffpeakHours = 88;
          break;
        case 'ONPEAKOFFPEAK':
          weeklyOnpeakHours = 80;
          weeklyOffpeakHours = 88;
          break;
        case 'INTERMITTENT':
          weeklyOnpeakHours = 84;
          weeklyOffpeakHours = 84;
          break;
        default:
          break;
      }
      const totalWeeklyHour = weeklyOffpeakHours + weeklyOnpeakHours;
      const totalWeeks = dateHelper.weeks(data.deliveryTimeFrom, data.deliveryTimeTo);
      const totalVolume = data.volume * totalWeeklyHour * totalWeeks;
      const RPPData = {
        deliveryTimeFrom: data.deliveryTimeFrom,
        deliveryTimeTo: data.deliveryTimeTo,
        shape: data.shape,
        volume: totalVolume,
        primaryPowerSource: data.primaryPowerSource,
        RECVolume: data.RECVolume,
        initialResponseBy: data.initialResponseBy,
        totalEstimateEnergyValue: data.totalEstimateEnergyValue,
        totalEstimateEnergyMonthlyValue: data.totalEstimateEnergyMonthlyValue,
        totalEstimateRECValue: data.totalEstimateRECValue,
        totalEstimateRECMonthlyValue: data.totalEstimateRECMonthlyValue,
        sellerRanking: data.sellerRanking,
        maxHourPeak: data.maxHourPeak,
        timezone: data.timezone,
        buyerId: data.id,
        ISOzoneId: data.ISOzoneId,
        RECId: data.RECId,
        status: 'Created',
      };
      const result = await RPP.build(RPPData).save();
      return result;
    }
  },

  fundRPP: async (data) => {
    const res = await RPP.update(
      {
        escrowReciepts: Sequelize.fn('array_append', Sequelize.col('escrowReciepts'), data.escrowReciepts),
        status: 'Funded',
      },
      { where: { id: data.RPPId, status: 'Created' } },
    );
    return res;
  },

  refundRPP: async (data) => {
    const now = new Date().getTime();
    const days = 14;
    const twoWeeks = 1000 * 60 * 60 * 24 * days;
    let dueDate = now + twoWeeks;
    const deliveryToQuery = `SELECT "deliveryTimeTo" FROM "RPPs" WHERE "id"=${data.RPPId}`;
    const deliveryTo = await db.query(deliveryToQuery, { type: Sequelize.QueryTypes.UPDATE });
    const deliveryTimeTo = parseInt(deliveryTo[0][0].deliveryTimeTo, 10);
    if (dueDate >= deliveryTimeTo) {
      dueDate = null;
    }
    const updateDueDateQuery = `UPDATE "RPPs" SET "escrowDueBy" = ${dueDate} WHERE "id" = ${data.RPPId}`;
    const updateDueDateQueryResult = await db.query(updateDueDateQuery,
      { type: Sequelize.QueryTypes.UPDATE });
    let result;
    if (updateDueDateQueryResult) {
      result = await RPP.update(
        {
          escrowReciepts: Sequelize.fn('array_append', Sequelize.col('escrowReciepts'), data.escrowReciepts),
        },
        { where: { id: data.RPPId, status: 'Inprogress' } },
      );
    } else {
      throw new Error('unable to update due date');
    }
    return result;
  },
};
