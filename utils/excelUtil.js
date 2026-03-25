const path = require('path');
const XLSX = require('xlsx');

function getExcelData(fileName, sheetName) {
    const filePath = path.join(__dirname, '../test-data', fileName);

    console.log("Resolved Path:", filePath); // ✅ debug once

    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[sheetName];

    return XLSX.utils.sheet_to_json(sheet);
}

module.exports = { getExcelData };