const mqtt = require("mqtt");
const common = require("@bgroves/common");
const GetClient = require("./GetClient");
const CreateFolder = require("./CreateFolder");
const GenIssueProps = require("./GenIssueProps");
const CreateDoc = require(`./CreateDoc`);
const CreateExcel = require(`./CreateExcel`);
const UploadDoc = require(`./UploadDoc`);
const fs = require("fs");
var mqttClient;



module.exports = async function ({mqttClient}) {
  common.log(`in issue.main`);

  // var dayjs = require('dayjs')
  // var day = dayjs().format();
  // console.log(`day=${day}`);

  let groupId = "3f29dd5d-9118-4747-b72f-c086ab22d7bb";
  let issueFolderId = "016VYMZDHXQMYFPTGIVZAZNILZIQP2RTU6";

  let cnc = "103";
  const { issueName, formatDateTime } = GenIssueProps();


  
  common.log(`groupId: ${groupId},issueFolderId: ${issueFolderId}`);
  let client = GetClient();
  let docName = await CreateDoc({ issueName, cnc, formatDateTime });
  // common.log(`docName: ${docName}`);
  let subFolderId = await CreateFolder({
    client,
    groupId,
    issueFolderId,
    issueName,
  });
  common.log(`subFolderId = ${subFolderId}`);

  let docId = await UploadDoc({ client, groupId, subFolderId, docName });
  common.log(`docId: ${docId}`);
  fs.unlink(docName, (err) => {
    if (err) {
      common.log(err);
      return
    }
    //file removed
  })

  excelName = await CreateExcel({ issueName, cnc, formatDateTime });
  let excelId = await UploadDoc({ client, groupId, subFolderId, docName:excelName });
  common.log(`excelId: ${excelId}`);
  fs.unlink(excelName, (err) => {
    if (err) {
      common.log(err);
      return
    }
    //file removed
  })
  // mqttClient.publish('CreateEngTask', subFolderId); 
  const msg = 
  { 
    // subFolderId: "016VYMZDDN5LDCF4BHZRF2DUT2ZORNTAKX"
    subFolderId
  } 

  let msgString = JSON.stringify(msg);
  // common.log(`Published InsToolLifeHistory => ${tcMsgString}`);
  // mqttClient.publish("InsToolLifeHistory", tcMsgString);

  mqttClient.publish('CreateEngTask', msgString); 

  
};
