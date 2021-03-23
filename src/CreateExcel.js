const Excel = require('exceljs');
const common = require("@bgroves/common");

module.exports = async function ({ issueName, cnc, formatDateTime }) {

  const docName = `${issueName}.xlsx`;  
  common.log(`CreateExcel.docName=${docName}`);

  // construct a streaming XLSX workbook writer with styles and shared strings
  const options = {
    filename: `./${docName}`,
    // filename: "./streamed-workbook.xlsx",
    useStyles: true,
    useSharedStrings: true,
  };
  const workbook = new Excel.stream.xlsx.WorkbookWriter(options);

  // const workbook = new ExcelJS.Workbook();

  workbook.creator = "Me";
  workbook.lastModifiedBy = "Her";
  workbook.created = new Date(1985, 8, 30);
  workbook.modified = new Date();
  workbook.lastPrinted = new Date(2016, 9, 27);

  // Force workbook calculation on load
  // workbook.calcProperties.fullCalcOnLoad = true;

  // const sheet = workbook.addWorksheet('My Sheet');

  // create a sheet with the first row and column frozen
  const sheet = workbook.addWorksheet("My Sheet", {
    views: [{ state: "frozen", xSplit: 1, ySplit: 1 }],
  });

  // create new sheet with pageSetup settings for A4 - landscape
  // const worksheet =  workbook.addWorksheet('My Sheet', {
  //     pageSetup:{paperSize: 9, orientation:'landscape'}
  //   });

  // Add column headers and define column keys and widths
  // Note: these column structures are a workbook-building convenience only,
  // apart from the column width, they will not be fully persisted.
  sheet.columns = [
    { header: "Id", key: "id", width: 10 },
    { header: "Name", key: "name", width: 32 },
    { header: "D.O.B.", key: "dob", width: 10, outlineLevel: 1 },
  ];

  // Add a couple of Rows by key-value, after the last current row, using the column keys
  sheet
    .addRow({ id: 1, name: "John Doe", dob: new Date(1970, 1, 1) })
    .commit();
  sheet
    .addRow({ id: 2, name: "Jane Doe", dob: new Date(1965, 1, 7) })
    .commit();

  // Finished adding data. Commit the worksheet
  sheet.commit();

  // Finished the workbook.
  await workbook.commit();
  return docName;
  // ... the stream has been written
}
// main();
