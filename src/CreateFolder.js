const common = require("@bgroves/common");

module.exports = async function ({
  client,
  groupId,
  issueFolderId,
  issueName,
}) {
  let url = `/groups/${groupId}/drive/items/${issueFolderId}/children`;
  const newFolder = {
    name: issueName,
    folder: {},
    "@microsoft.graph.conflictBehavior": "rename",
  };
  let folderDetails = await client.api(url).post(newFolder);
  return folderDetails.id;
};
