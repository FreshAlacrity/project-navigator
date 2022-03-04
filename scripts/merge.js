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

function makeTitleDict(data) {
  // make a dictionary of names to ids
  let entry_list = Object.values(data)
  let idsByTitle = {}
  entry_list.forEach(e => {
    let namesList = []
    if (e['Aliases']){
     namesList = e['Aliases'].split(', ')
    }
    namesList.push(e['Project Title'])
    namesList.forEach(n => {
      n = n.toLowerCase()
      if (!n) {
        log(`invalid name '${n}' from entry ` + JSON.stringify(e))
      } else if (idsByTitle.hasOwnProperty(n)) {
        log(`More than one project has the name/alias '${n}': ${idsByTitle[n]} and ${e['Project ID']}`)
      }
      idsByTitle[n] = e['Project ID']
    })
    
  })
  return idsByTitle
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
  // #todo - assign GitHub and CodePen when links with related urls are referenced
  return entry
}

function checkEntry(e) {
  if (e['Project Title'] !== e['Project Title'].trim()) {
    log(`extra space detected in ${e['Project Title']}`)
    // #todo update sheet entry as well
    e['Project Title'] = e['Project Title'].trim()
  }
}

function excludeRetired(e) {
  if (e.Stage === 'Retired') { 
    //log(`excluding retired project: ${e['Project Title']}`)
    return false 
  } else { 
    return true 
  }
}

function merge(source) {
  source.data.list.forEach(checkEntry)
  source.data.list = source.data.list.filter(excludeRetired)
  source.data.list = source.data.list.map(assignKeywords)
  source.data.by_ID = byKey(source.data.list, source.id)
  source.data.by_title = makeTitleDict(source.data.by_ID)

  // to save changes to sheet:
  //update(entryObj = { 'Project ID': '443BF665', 'Project Title': 'Test Project' })
  
  return source
}