// #later fold this into an init function
let params = new URLSearchParams(window.location.search)
var globalStorage = { 
    _current_type:  (params.get('type') ?? 'projects'),
    _force_reload: (params.get('reload') ?? false),
    _GitHub_URL: 'https://github.com/FreshAlacrity/project-navigator/main/',
    _Sheets_URL: 'https://script.google.com/macros/s/AKfycbwKryEU-Vhr-1m18QsRSc6CMjiNRcSbSCgNO5hOalOC6vtwtyLVme_kPvqZV_2FMmGc/exec',
    _data_sources: {}
  }

globalStorage._data_sources[globalStorage._current_type] = {
    key: `_${globalStorage._current_type}_list`,
    loc: globalStorage._current_type, 
    url: `${globalStorage._Sheets_URL}?loc=${globalStorage._current_type}`,
    type: 'Google Sheets',
    name: 'Project Title',
    id: 'Project ID',
    always_fetch: false,
    data: {}
  }

function getSource() {
  return globalStorage._data_sources[globalStorage._current_type]
}
function log (...args) { 
  args.forEach(a => {
    console.log(alacrity.tidy(a)) 
  })
}
