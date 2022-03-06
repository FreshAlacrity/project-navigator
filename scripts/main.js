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
    about_id: '2FFFFAB9',
    alias_list: ['Aliases'],
    order_by: '_Sort',
    image_url_stem: '/images/', // for fields that end in .png .jpg etc, pre-pend this for <img> elements
    keyword_list: 'See Also', // where assigned keyword project IDs will be stored #todo
    allowed_keywords: ['Project Title', 'Aliases', 'Project ID'],
    keyword_sources: [
      'Project Title',
      'Aliases',
      'License',
      'Tech',
      'Parents',
      'Brief',
      '_Other',
      'Inspiration',
      'Learn More',
      'Mockup',
      'Live'
      ], // look within these fields for allowed_keywords #todo
    must_be_keywords: ['License', 'Tech', 'Parents'], // alert if there are no exact matches in allowed_keywords #todo
    always_fetch: false,
    data: {}
  }
// #later add entries for Shoutouts, Wandering Library and Glossary

function getSource() {
  return globalStorage._data_sources[globalStorage._current_type]
}
function log (...args) { 
  args.forEach(a => {
    console.log(alacrity.tidy(a)) 
  })
}
