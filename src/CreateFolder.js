const ClientCredentialAuthenticationProvider = require("./AuthenticationProvider");
var graph = require("@microsoft/microsoft-graph-client");
const common = require("@bgroves/common");
require("isomorphic-fetch");


module.exports = async function ({client,groupId,issueFolderId,issueName}) {
  // let groupId =  '3f29dd5d-9118-4747-b72f-c086ab22d7bb';
  // let issueFolderId =  '016VYMZDHXQMYFPTGIVZAZNILZIQP2RTU6';
  let url = `/groups/${groupId}/drive/items/${issueFolderId}/children`;
  // `/groups/3f29dd5d-9118-4747-b72f-c086ab22d7bb/drive/items/016VYMZDHXQMYFPTGIVZAZNILZIQP2RTU6/children`
  //  https://graph.microsoft.com/v1.0/groups/3f29dd5d-9118-4747-b72f-c086ab22d7bb/drive/items/016VYMZDHXQMYFPTGIVZAZNILZIQP2RTU6/children
  const newFolder = {
      "name": issueName,
      "folder": { },
      "@microsoft.graph.conflictBehavior": "rename"
    }
  let folderDetails = await client.api(url).post(newFolder);
    // let folderDetails = await client.api('/groups/3f29dd5d-9118-4747-b72f-c086ab22d7bb/drive/items/016VYMZDHXQMYFPTGIVZAZNILZIQP2RTU6/children').post(newFolder);
  //     console.log(folderDetails.id);
  return folderDetails.id;
  //016VYMZDAREQG6XMPDPNFLPGJNXRDCX7PJ
}
