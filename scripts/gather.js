
// localForage automatically does JSON.parse() and JSON.stringify() when getting/setting values
async function gatherData(fresh = false) {
  const gitHubURL = 'https://github.com/FreshAlacrity/project-navigator/main/'
  const sheetsURL = 'https://script.google.com/macros/s/AKfycbwKryEU-Vhr-1m18QsRSc6CMjiNRcSbSCgNO5hOalOC6vtwtyLVme_kPvqZV_2FMmGc/exec'

  // get url parameters
  let dataObj = {}
  let params = new URLSearchParams(window.location.search)
  let dataSources = [
    {
      key: '_projects_list',
      // 'fetch' param supports fetching data from different/test sheets
      loc: (params.get('fetch') ?? 'projects'), 
      url: sheetsURL,
      parse: getSheetData,
      always_fetch: false
    }
  ]
  
  // check what keys localForage has saved (later maybe avoid if fresh is set?)
  let localTest = await localforage.keys().then(keys => {
    if (params.get('reload')) {
      log(`Loading fresh data, clearing local keys: ${keys.join(", ")}`)
      keys.forEach(a => { localforage.removeItem(a) })
      return {}
    } else {
      return Object.fromEntries(keys.map(key => [key, true]))
    }
  }).catch(log)

  function stored(key) { 
    return localTest.hasOwnProperty(key) 
  }
  
  function store(key, obj) { 
    localforage.setItem(key, obj).catch(log) 
  }

  function load(source) {
    if (!fresh && !source.always_fetch && stored(source.key)) {

      return localforage.getItem(source.key).then(data => {
        log(`${source.key} data loaded from local storage`)
        return data
      }).catch(log)

    } else {

      return fetch(source.url + '?loc=' + source.loc, { credentials: "omit" })
        .then((response) => response.json())
        .then((data) => {
          if (typeof source.parse === 'function') {
            data = source.parse(data, source.key)
          }
          log(`${source.key} data fetched from source`)
          store(source.key, data)
          return data
        }).catch(log)

    }
  }

  let tests = await Promise.all(dataSources.map(load))
  return merge(Object.assign(dataObj, ...tests))
}