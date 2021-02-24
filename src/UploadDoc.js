const fs = require("fs");

const ClientCredentialAuthenticationProvider = require("./AuthenticationProvider");
var graph = require("@microsoft/microsoft-graph-client");
const common = require("@bgroves/common");
require("isomorphic-fetch");


module.exports = async function ({client,groupId,subFolderId,docName}) {
  // let groupId =  '3f29dd5d-9118-4747-b72f-c086ab22d7bb';
  // let issueFolderId =  '016VYMZDHXQMYFPTGIVZAZNILZIQP2RTU6';
  let url = `/groups/${groupId}/drive/items/${subFolderId}:/${docName}:/content`;
  console.log(`UploadDoc.url: ${url}`);
  // `/groups/3f29dd5d-9118-4747-b72f-c086ab22d7bb/drive/items/016VYMZDHXQMYFPTGIVZAZNILZIQP2RTU6/children`
  //  https://graph.microsoft.com/v1.0/groups/3f29dd5d-9118-4747-b72f-c086ab22d7bb/drive/items/016VYMZDHXQMYFPTGIVZAZNILZIQP2RTU6/children
  binary = fs.readFileSync(`./${docName}`);
  // process.stdout.write(binary);
  // process.stdout.write(binary.slice(0, 48));
  // const clientOptions = {
  //   defaultVersion: "v1.0",
  //   debugLogging: false,
  //   authProvider: new ClientCredentialAuthenticationProvider(),
  // };

  // const client = graph.Client.initWithMiddleware(clientOptions);
  let doc = await client
    .api(url)
    .put(binary);
  return doc.id;
  //016VYMZDAREQG6XMPDPNFLPGJNXRDCX7PJ
}
//       `groups/3f29dd5d-9118-4747-b72f-c086ab22d7bb/drive/items/016VYMZDAREQG6XMPDPNFLPGJNXRDCX7PJ:/${fileName}:/content`
