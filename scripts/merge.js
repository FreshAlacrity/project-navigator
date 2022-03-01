

function update(entryObj) {
  if (entryObj) {
    // #later better validation here
    fetch(sheetsURL, {
      credentials:'omit', 
      method:"POST", 
      body:JSON.stringify(entryObj),
      headers: { 'Content-Type': 'application/json' },
      mode:"no-cors"
      })
    .then(response => log(`Updated project ID ${entryObj['Project ID']} with response: '${JSON.stringify(response)}'`));
  } else {
    log(`Can't update a project without a project entry object!`)
  }
}


function byKey(arrayOfObj, key) {
  let newObj = {}
  arrayOfObj.forEach(entry => {
    if (entry.hasOwnProperty(key)) {
      if (newObj.hasOwnProperty([entry[key]])) {
        log(`Key colision: ${key} for ${JSON.stringify(entry)} already taken`)
      }
      newObj[entry[key]] = entry
    } else {
      log(`Can't list ${JSON.stringify(entry)} by ${key} because it doesn't have that property`)
    }
  })
  return newObj
}

function no(project, thing) { 
  if (!project[thing]) { log(`${project['Project Title']} has no ${thing}`) }
}

function assignKeywords(entry) {

  return entry
}

function merge(allData) {
  allData._projects_list = allData._projects_list.map(assignKeywords)
  allData._projects_by_ID = byKey(allData._projects_list, 'Project ID')
  //update(entryObj = { 'Project ID': '443BF665', 'Project Title': 'Test Project' })
  return allData
}