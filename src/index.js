const mqtt = require("mqtt");

const ClientCredentialAuthenticationProvider = require("./AuthenticationProvider");
var graph = require("@microsoft/microsoft-graph-client");
const common = require("@bgroves/common");
require("isomorphic-fetch");
var mqttClient;

// https://docx.js.org/#/?id=welcome
const fs = require("fs");
const docx = require("docx");
//import { Document, Packer, Paragraph, TextRun } from "docx";
const { Document, Packer, Paragraph, TextRun } = docx;
// Create document

function CreateDoc() {
  const doc = new Document();
  const cnc = "103";

  // Documents contain sections, you can have multiple sections per document, go here to learn more about sections
  // This simple example will only contain one section
  doc.addSection({
    properties: {},
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text: "CNC: ",
            bold: true,
          }),
          new TextRun({
            text: cnc,
          }),
          new TextRun({
            text: "Workcenter: ",
            bold: true,
            break: 1,
          }),
          new TextRun({
            text: "Part Number: ",
            bold: true,
            break: 1,
          }),
          new TextRun({
            text: "Operation: ",
            bold: true,
            break: 1,
          }),
          new TextRun({
            text: "Tool Assembly: ",
            bold: true,
            break: 1,
          }),
          new TextRun({
            text: "Tooling: ",
            bold: true,
            break: 1,
          }),
          new TextRun({
            text: "Description: ",
            bold: true,
            break: 1,
          }),
          new TextRun({
            text: "Resolution: ",
            bold: true,
            break: 1,
          }),
        ],
      }),
    ],
  });

  // Used to export the file into a .docx file
  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("MyDoc7.docx", buffer);
    UploadFile('MyDoc7.docx') 
  });
}
async function CreateFolder()
{
    console.log(`in CreateFolder`);
    const clientOptions = {
        defaultVersion: "v1.0",
        debugLogging: false,
        authProvider: new ClientCredentialAuthenticationProvider(),
      };
    
      const client = graph.Client.initWithMiddleware(clientOptions);
    
//       const mail = {
//         message: {
//           subject: "Tooling Issue",
//           body: {
//             content:
//               "<h5>Tooling Issue</h5><br>Tool 1 on CNC 120 which is running Dana RH 6K Knuckles is not reaching tool life.<br>If you are at work you can go to the <a href='https://eng'>app</a>",
//             contentType: "html",
//             // contentType: "Text",
//             // content: "Tool 1 on Dana RH 6K Knuckles is not reaching tool life."
//           },
//           toRecipients: [
//             {
//               emailAddress: {
//                 address: "bgroves@mobexglobal.com",
//               },
//             },
//           ],
//           //   ccRecipients: [
//           //     {
//           //       emailAddress: {
//           //         address: "dkreps@mobexglobal.com"
//           //       }
//           //     }
//           //   ]
//         },
//         saveToSentItems: "false",
//       };
//   let res = await client.api('/users/bgroves@buschegroup.com/sendMail').post(mail);
//  https://graph.microsoft.com/v1.0/groups/3f29dd5d-9118-4747-b72f-c086ab22d7bb/drive/items/016VYMZDHXQMYFPTGIVZAZNILZIQP2RTU6/children
// const newFolder = {
//     "name": "Test221538",
//     "folder": { },
//     "@microsoft.graph.conflictBehavior": "rename"
//   }
//     let folderDetails = await client.api('/groups/3f29dd5d-9118-4747-b72f-c086ab22d7bb/drive/items/016VYMZDHXQMYFPTGIVZAZNILZIQP2RTU6/children').post(newFolder);
//     console.log(folderDetails);
//     console.log(folderDetails.id);

    //016VYMZDAREQG6XMPDPNFLPGJNXRDCX7PJ
}

async function UploadFile(fileName)
{
    console.log(`in UploadFile`);
    binary = fs.readFileSync(`./${fileName}`);
    // process.stdout.write(binary);    
    // process.stdout.write(binary.slice(0, 48));    
    const clientOptions = {
        defaultVersion: "v1.0",
        debugLogging: false,
        authProvider: new ClientCredentialAuthenticationProvider(),
      };
    
      const client = graph.Client.initWithMiddleware(clientOptions);
      let res = await client.api(`groups/3f29dd5d-9118-4747-b72f-c086ab22d7bb/drive/items/016VYMZDAREQG6XMPDPNFLPGJNXRDCX7PJ:/${fileName}:/content`).put(binary);
    
    
    // const stream = 'The contents of the file goes here.';

    // let res = await client.api('groups/3f29dd5d-9118-4747-b72f-c086ab22d7bb/drive/items/016VYMZDAREQG6XMPDPNFLPGJNXRDCX7PJ:/test.docx:/content').put(stream);
    
    // let res = await client.api('/me/drive/items/{item-id}/content')
    //     .put(stream);
    
        

    //016VYMZDAREQG6XMPDPNFLPGJNXRDCX7PJ
}

async function main()
{
    console.log(`in issue.main`);
    await CreateDoc();
}
main();
// Done! A file called 'My Document.docx' will be in your file system.
/*
https://nodesource.com/blog/understanding-streams-in-nodejs/
https://docs.microsoft.com/en-us/graph/api/driveitem-createuploadsession?view=graph-rest-1.0
https://stackoverflow.com/questions/62436697/how-to-upload-a-local-file-into-sharepoint-using-graph-api
https://stackoverflow.com/questions/60758259/how-to-add-binary-data-in-microsoft-graph-api-for-uploading-file-using-upload-se
https://stackoverflow.com/questions/55919294/upload-an-image-file-to-sharepoint-via-api-graph
$contentBytes = file_get_contents('image/image.jpg');
    $options = array(
        'http' => array(
            'method' => 'PUT',
            'header' => "Content-Type: application/octet-stream\r\nContent-Length:{$chunkSize}\r\nContent-Range: bytes {$startRange}- {$endRange}/{$fileSize}",
            'content' => $contentBytes,
        )
    );
*/