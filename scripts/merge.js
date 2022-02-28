function byKey(arrayOfObj, key) {
  let newObj = {}
  arrayOfObj.forEach(entry => {
    if (newObj.hasOwnProperty([entry[key]])){
      log(`Key colision: ${key} for ${JSON.stringify(entry)} already taken`)
    }
    newObj[entry[key]] = entry
  })
  return newObj
}

function no(project, thing) { 
  if (!project[thing]) { log(`${project['Project Title']} has no ${thing}`) }
}

function merge(allData) {
  // #todo check each project for ID
  // #todo make IDs for projects that have none
  // #todo make a dictionary of projects by ID
  return allData
}