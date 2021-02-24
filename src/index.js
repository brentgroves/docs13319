const mqtt = require("mqtt");

const common = require("@bgroves/common");

const GetClient = require("./GetClient");
const CreateFolder = require("./CreateFolder");
const GenIssueProps = require('./GenIssueProps');
const CreateDoc = require(`./CreateDoc`);
const UploadDoc = require(`./UploadDoc`);
var mqttClient;



async function main() {
  console.log(`in issue.main`);
  let groupId =  '3f29dd5d-9118-4747-b72f-c086ab22d7bb';
  let issueFolderId =  '016VYMZDHXQMYFPTGIVZAZNILZIQP2RTU6';

  let cnc = '103';
  const {issueName,formatDateTime}=GenIssueProps();
  console.log(`groupId: ${groupId},issueFolderId: ${issueFolderId}`);
  let client = GetClient();
  let docName = await CreateDoc({issueName,cnc,formatDateTime});
  // console.log(`docName: ${docName}`);
  let subFolderId = await CreateFolder({client,groupId,issueFolderId,issueName});
  let docId = await UploadDoc({client,groupId,subFolderId,docName});
  console.log(`docId: ${docId}`);
}
main();
/*
https://nodesource.com/blog/understanding-streams-in-nodejs/
https://docs.microsoft.com/en-us/graph/api/driveitem-createuploadsession?view=graph-rest-1.0
https://stackoverflow.com/questions/62436697/how-to-upload-a-local-file-into-sharepoint-using-graph-api
https://stackoverflow.com/questions/60758259/how-to-add-binary-data-in-microsoft-graph-api-for-uploading-file-using-upload-se
https://stackoverflow.com/questions/55919294/upload-an-image-file-to-sharepoint-via-api-graph
*/
