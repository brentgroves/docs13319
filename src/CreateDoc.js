const ClientCredentialAuthenticationProvider = require("./AuthenticationProvider");
var graph = require("@microsoft/microsoft-graph-client");
const common = require("@bgroves/common");
require("isomorphic-fetch");
var datetime = require("node-datetime");
const fs = require("fs");
const docx = require("docx");
const { CLIENT_RENEG_LIMIT } = require("tls");
//import { Document, Packer, Paragraph, TextRun } from "docx";
const { Document, Packer, Paragraph, TextRun } = docx;

const GenFolderName = require('./GenIssueProps');

module.exports = async function ({issueName,cnc,formatDateTime}) {
  const doc = new Document();
  const docName = `${issueName}.docx`;
  console.log(`CreateDoc.docName=${docName}`);
  // Documents contain sections, you can have multiple sections per document, go here to learn more about sections
  // This simple example will only contain one section
  doc.addSection({
    properties: {},
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text: "Datetime: ",
            bold: true,
          }),
          new TextRun({
            text: formatDateTime,
          }),
          new TextRun({
            text: "CNC: ",
            bold: true,
            break: 1,
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
  // return Packer.toBuffer(doc);
  // return buffer;
  // Packer.toBuffer(doc).then((buffer) => {
  //   fs.writeFileSync(docName, buffer);
  //   resolve(docName);
  //   // UploadFile("Issue.docx");
  // });
  // let buffer = await Packer.toBuffer(doc);

  return new Promise(function(resolve, reject) {
    // resolve(docName);
    // Used to export the file into a .docx file
    Packer.toBuffer(doc).then((buffer) => {    
    fs.writeFileSync(docName, buffer);
    resolve(docName);
    });
  });
}
