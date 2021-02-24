const fs = require("fs");
const common = require("@bgroves/common");


module.exports = async function ({ client, groupId, subFolderId, docName }) {
  let url = `/groups/${groupId}/drive/items/${subFolderId}:/${docName}:/content`;
  common.log(`UploadDoc.url: ${url}`);
  binary = fs.readFileSync(`./${docName}`);
  let doc = await client.api(url).put(binary);
  return doc.id;
};
