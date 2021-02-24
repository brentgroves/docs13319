// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
var datetime = require("node-datetime");

// eslint-disable-next-line no-unused-vars
module.exports = function () {
  // eslint-disable-line no-unused-vars
  const dateTime = datetime.create();
  const suffix = dateTime.format("ymdHMS");
  const formatDateTime = dateTime.format('Y/m/d I:M p');
  const issueName = "Issue" + suffix;
  console.log(`issueName: ${issueName}, formatDateTime: ${formatDateTime}`);
  return {
    issueName,
    formatDateTime
  };
};
