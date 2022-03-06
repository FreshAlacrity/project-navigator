async function store(source) {
  // localForage automatically does JSON.parse() and JSON.stringify() when getting/setting values
  localforage.setItem(source.key, source.data).then(data => {
    log(`stored ${source.key}`)//${JSON.stringify(data)} to `)
  }).catch(log)
  return source
}

async function load(source) {
  return fetch(source.url, { credentials: "omit" })
    .then((response) => response.json())
    .then((data) => {
      if (source.type === 'Google Sheets') {
        source.data = getSheetData(data)
      }
      log(`${source.key} loaded from source`)
      return source
    }).catch(log)
}

async function getlocal(source) {
  return localforage.getItem(source.key).then(data => {
    log(`${source.key} fetched from local storage`)
    source.data = data
    return source
  }).catch(log)
}

localforage.keys().then(keys => {
  log(`available local storage keys: ${keys}`)
  for (const [type, source] of Object.entries(globalStorage._data_sources)) {    
    if (keys.includes(source.key)) {
      // fetch it from local storage
      getlocal(source).then(display)
    }
    if (!keys.includes(source.key) || source.always_fetch || globalStorage._force_reload) {
      // load in from external source
      load(source).then(store).then(merge).then(display)
    }
  }
  // #later confirm when all loading data is loaded in the log and change cursor to normal
  //let tests = await Promise.all(dataSources.map(load))
  //return merge(Object.assign(dataObj, ...tests))
  //testSearch()
})