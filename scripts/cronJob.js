const { CronJob } = require('cron');
const fs = require('fs');
const mustache = require('mustache');
const moment = require('moment-timezone');
const { rppService, bidService, userService } = require('../services');
const { mailer, notification } = require('../helpers');
const { logger } = require('../utils');

let noBidTemplate;
let rebidTemplate;
let noRebidTemplate;
let tieTemplate;
let bidSuccessTemplate;
let SellerSelectedTemplate;

fs.readFile(`${__dirname}/../templates/successBid.html`, 'utf8', (err, data) => {
  if (err) bidSuccessTemplate = '';
  else bidSuccessTemplate = data;
  mustache.parse(bidSuccessTemplate);
});

fs.readFile(`${__dirname}/../templates/noBid.html`, 'utf8', (err, data) => {
  if (err) noBidTemplate = '';
  else noBidTemplate = data;
  mustache.parse(noBidTemplate);
});

fs.readFile(`${__dirname}/../templates/selectedSeller.html`, 'utf8', (err, data) => {
  if (err) noBidTemplate = '';
  else SellerSelectedTemplate = data;
  mustache.parse(SellerSelectedTemplate);
});

fs.readFile(`${__dirname}/../templates/rebid.html`, 'utf8', (err, data) => {
  if (err) rebidTemplate = '';
  else rebidTemplate = data;
  mustache.parse(rebidTemplate);
});

fs.readFile(`${__dirname}/../templates/noRebid.html`, 'utf8', (err, data) => {
  if (err) noRebidTemplate = '';
  else noRebidTemplate = data;
  mustache.parse(noRebidTemplate);
});

fs.readFile(`${__dirname}/../templates/tie.html`, 'utf8', (err, data) => {
  if (err) tieTemplate = '';
  else tieTemplate = data;
  mustache.parse(tieTemplate);
});

const mail = (isRebidCheck, mailList, RPPId, status, bidTill) => {
  if (!isRebidCheck) {
    mailer.sendMail({
      email: mailList,
      subject: `Status of your Bid for RPP ${RPPId}`,
      template: mustache.render(rebidTemplate, { RPPId, status, bidTill }),
    });
  } else {
    mailer.sendMail({
      email: mailList,
      subject: `Status of your Bid for RPP ${RPPId}`,
      template: mustache.render(noRebidTemplate, { RPPId, status }),
    });
  }
};

const getBids = async (rpps, isRebidCheck) => {
  rpps.forEach(async (rpp) => {
    try {
      const RPPId = rpp.get('id');
      const bids = await bidService.calculateLowestBid(RPPId);
      const buyerEmail = await userService.getUserEmail(rpp.get('buyerId'));

      const finalTime = moment.tz(new Date((parseInt(rpp.get('initialResponseBy'), 10)) + 900000), rpp.get('timezone')).format('YYYY-MM-DD HH:mm');

      if (bids.lowestBids.length === 0) {
        const RPPExpireResult = await rppService.expireRPP(RPPId);
        if (RPPExpireResult[0]) {
          mailer.sendMail({
            email: buyerEmail.get('email'),
            subject: `Status of your RPP ${RPPId}`,
            template: mustache.render(noBidTemplate, { userEmail: buyerEmail.get('email'), RPPId }),
          });
          let buyerUsers = notification.userList;
          buyerUsers = await buyerUsers.filter(obj => obj.userId === rpp.get('buyerId'));
          notification.socketServer.updateSocketValue(`Your RPP ${RPPId} has expired due to no bid done by any User.`, buyerUsers);
        }
      } else if (bids.lowestBids.length === 1) {
        const sellerEmail = bids.lowestBids[0].email;
        const sellerId = bids.lowestBids[0].userId;
        let notifySingleSeller = notification.userList;
        notifySingleSeller = await notifySingleSeller.filter(obj => obj.userId === sellerId); // eslint-disable-line max-len
        if (!isRebidCheck) {
          notification.socketServer.updateSocketValue(`Your Bid is lowest for RPP ${RPPId}.You can rebid till ${finalTime}`, notifySingleSeller);
        } else {
          notification.socketServer.updateSocketValue(`Congratulations! You have been selected for RPP ${RPPId} .`, notifySingleSeller);
        }
        mail(isRebidCheck, sellerEmail, RPPId, 'lowest', finalTime);
        if (isRebidCheck) {
          await bidService.inactiveBid(RPPId);
          await rppService.updateSeller({ RPPId, sellerId });
          mailer.sendMail({
            email: buyerEmail.get('email'),
            subject: `Status of your RPP ${RPPId}`,
            template: mustache.render(bidSuccessTemplate, { userEmail: buyerEmail.get('email'), RPPId, sellerEmail }),
          });
          let buyerUser = notification.userList;
          buyerUser = await buyerUser.filter(obj => obj.userId === rpp.get('buyerId'));
          notification.socketServer.updateSocketValue(`Seller found for RPP ${RPPId}: ${sellerEmail}.`, buyerUser);
        }
      } else {
        const emailList = await bids.lowestBids.map(({ email }) => email);
        const tiedSellers = await bids.lowestBids.map(({ userId }) => userId);
        if (isRebidCheck) {
          await bidService.inactiveBid(RPPId);
          const sellerRanking = rpp.get('sellerRanking');
          const filteredSellerList = sellerRanking.filter(element => tiedSellers.includes(element));
          if (filteredSellerList.length > 0) {
            await rppService.updateSeller({ RPPId, sellerId: filteredSellerList[0] });
            const seller = await userService.getUserEmail(filteredSellerList[0]);
            mailer.sendMail({
              email: buyerEmail.get('email'),
              subject: `Status of your RPP ${RPPId}`,
              template: mustache.render(bidSuccessTemplate, { userEmail: buyerEmail.get('email'), RPPId, sellerEmail: seller.dataValues.email }), // eslint-disable-line
            });
            const sellerEmail = seller.dataValues.email;
            let buyerUser = notification.userList;
            buyerUser = await buyerUser.filter(obj => obj.userId === rpp.get('buyerId'));
            notification.socketServer.updateSocketValue(`Seller found for RPP ${RPPId}: ${sellerEmail}`, buyerUser);
            let sellerUser = notification.userList;
            sellerUser = await sellerUser.filter(obj => obj.userId === filteredSellerList[0]);
            notification.socketServer.updateSocketValue(`Congratulations! You have been selected for RPP ${RPPId} .`, sellerUser);
            mailer.sendMail({
              email: sellerEmail,
              subject: `Status of your RPP ${RPPId}`,
              template: mustache.render(SellerSelectedTemplate, { RPPId }),// eslint-disable-line
            });
          }
        } else {
          mail(isRebidCheck, emailList, RPPId, 'lowest', finalTime);
          let notifyLowestSellers = notification.userList;
          notifyLowestSellers = await notifyLowestSellers.filter(element => tiedSellers.includes(element.userId)); // eslint-disable-line max-len
          notification.socketServer.updateSocketValue(`Your Bid is lowest for RPP ${RPPId}.You can rebid till ${finalTime}`, notifyLowestSellers);
        }
      }
      if (bids.otherBids.length > 0) {
        const otherEmailList = await bids.otherBids.map(({ email }) => email);
        const idList = await bids.otherBids.map(({ userId }) => userId);
        mail(isRebidCheck, otherEmailList, RPPId, 'not lowest', finalTime);
        let notifyNotLowestSellers = notification.userList;
        notifyNotLowestSellers = await notifyNotLowestSellers.filter(element => idList.includes(element.userId)); // eslint-disable-line max-len
        notification.socketServer.updateSocketValue(`Your Bid is not lowest for RPP ${RPPId} .`, notifyNotLowestSellers);
      }
    } catch (error) {
      logger.error('Error', error.message); // eslint-disable-line no-console
    }
  });
};

// eslint-disable-next-line no-new
new CronJob('* * * * * *', async () => {
  const currentTimestamp = parseInt(new Date().getTime() / 1000, 10) * 1000;
  const sevenMinuteBeforeTimestamp = currentTimestamp - 900000;
  const currentRPPs = await rppService.getRPPsbyInitialResponse(currentTimestamp);
  const rebidRPPs = await rppService.getRPPsbyInitialResponse(sevenMinuteBeforeTimestamp);
  if (currentRPPs.length > 0) {
    getBids(currentRPPs, false);
  }
  if (rebidRPPs.length > 0) {
    getBids(rebidRPPs, true);
  }
}, null, true, 'America/Los_Angeles');
