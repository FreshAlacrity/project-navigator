function checkSpreadsheetImport (data) {
  if (data.length > 0 && data[0].length > 0) {
    log('Successfully loaded spreadsheet data. First row:')
    log(JSON.stringify(data[0]));
    return true;
  } else {
    throw 'Attempted to load current project data but got an invalid response:' + JSON.stringify(data)
    return false
  }
}

// to convert from Google Sheets to a handy object
function tableToJSON(tableData) {
  let arr = []
  let headers = tableData[0]
  tableData = tableData.slice(1) // to remove the header and the row of analytics
  tableData.forEach(row => {
    let name = row[0]
    let newObj = {}
    newObj = {}
    headers.forEach((header, index) => {
      if (header !== '' && row[index] !== '') {
        newObj[header] = row[index]
      }
    })
    arr.push(newObj)
  })
  return arr
}

function getSheetData(sheetData, key) {
  let newObj = {}
  newObj[key] = tableToJSON(sheetData)
  return newObj
}