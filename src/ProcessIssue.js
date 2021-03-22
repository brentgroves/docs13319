const mqtt = require("mqtt");
const common = require("@bgroves/common");
const GetClient = require("./GetClient");
const CreateFolder = require("./CreateFolder");
const GenIssueProps = require("./GenIssueProps");
const CreateDoc = require(`./CreateDoc`);
const CreateExcel = require(`./CreateExcel`);
const UploadDoc = require(`./UploadDoc`);
var mqttClient;



module.exports = async function () {
  common.log(`in issue.main`);

  // var dayjs = require('dayjs')
  // var day = dayjs().format();
  // console.log(`day=${day}`);

  let groupId = "3f29dd5d-9118-4747-b72f-c086ab22d7bb";
  let issueFolderId = "016VYMZDHXQMYFPTGIVZAZNILZIQP2RTU6";

  let cnc = "103";
  const { issueName, formatDateTime } = GenIssueProps();


  /*
  common.log(`groupId: ${groupId},issueFolderId: ${issueFolderId}`);
  let client = GetClient();
  let docName = await CreateDoc({ issueName, cnc, formatDateTime });
  let excelName = await CreateExcel({ issueName, cnc, formatDateTime });
  // common.log(`docName: ${docName}`);
  let subFolderId = await CreateFolder({
    client,
    groupId,
    issueFolderId,
    issueName,
  });
  let docId = await UploadDoc({ client, groupId, subFolderId, docName });
  common.log(`docId: ${docId}`);
  */
};
