/** @function monthDiff
* @desc This function is used to get number of months between two timestamps
* @param {String} two timestamps
* @return {Integer} number of months
*/
function monthDiff(date1, date2) {
  // const from = new Date(date1);
  // const to = new Date(date2);
  // console.log("things", to.getMonth(), from.getMonth(), to.getFullYear(), from.getFullYear());
  // return (to.getMonth() - from.getMonth() + (12 * (to.getFullYear() - from.getFullYear())));
  let diff = (date2 - date1) / 1000;
  diff /= (30 * 24 * 60 * 60);
  return Math.abs(diff);
}

/** @function weeks
* @desc This function is used to get number of weeks between two timestamps
* @param {String} two timestamps
* @return {Integer} number of weeks
*/
function weeks(date1, date2) {
  const ONEWEEK = 86400000 * 7;
  const difference = Math.abs(date2 - date1);
  return difference / ONEWEEK;
}

/** @function daysInThisMonth
* @desc This function is used to get number of days in current month
* @param {String} timestamp
* @return {Integer} number of days
*/
function daysInThisMonth(timestamp) {
  const now = new Date(timestamp);
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
}

/** @function daysTo
* @desc This function is used to get number of days to a date
* @param {String} timestamp
* @return {Integer} number of days to
*/
function daysTo(to) {
  const from = new Date().getTime();
  return Math.floor((to - from) / 86400000);
}

module.exports = {
  monthDiff,
  weeks,
  daysInThisMonth,
  daysTo,
};
