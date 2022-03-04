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

function getSheetData(sheetData, key) {
  let newObj = {}
  let arr = []
  let headers = sheetData[0]
  sheetData = sheetData.slice(2) // to remove the header and the row of analytics
  sheetData.forEach(row => {
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
  newObj[key + '_headers'] = headers
  newObj[key] = arr
  return newObj
}