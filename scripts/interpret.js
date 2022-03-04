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

function getSheetData(sheetData) {
  let data = { 
    headers: sheetData[0],
    list: [] 
  }

  // slice to remove the header and the row of analytics
  sheetData.slice(2).forEach(row => {
    // #later can I do this with map()?
    let rowObj = {}
    data.headers.forEach((header, index) => {
      if (header !== '' && row[index] !== '') {
        rowObj[header] = row[index]
      }
    })
    data.list.push(rowObj)
  })
  return data
}