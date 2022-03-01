// #todo make a way to validate all urls through this alias list
function getTitle(link) {
  let aliases = {
    'github.com':'GitHub Source',
    'script.google.com':'Google Apps Script',
    'codepen.io':'CodePen',
    'drive.google.com': 'Google Drive',
    'spreadsheets': 'Google Sheets',
    'document': 'Google Docs',
    'youtu.be': 'YouTube',
    'www.youtube.com': 'YouTube',
    'designer.gravit.io': 'Gravit Designer',
    'developer.mozilla.org': 'Mozilla Web Documentation',
    'www.w3.org': 'W3Schools',
    'wikipedia': 'Wikipedia',
    'play.google.com': 'Google Play'
  }
  if (aliases.hasOwnProperty(link.hostname)) {
    return aliases[link.hostname]
  } else if (aliases.hasOwnProperty(link.pathname.split('/')[1])) {
    return aliases[link.pathname.split('/')[1]]
  } else {
    let guess = link.hostname.split(/(?:w{3}\.)|(?:\.com)|\s/g).join('')
    guess = guess.charAt(0).toUpperCase() + guess.slice(1)
    log(`No link alias found for ${link.hostname} or ${link.pathname.split('/')[1]}; using ${guess}`)
    return guess
  }
}

function makeDetail() {
  return document.createElement('li')
}

function prettyDate(entry, key, parent) {
  let detail = makeDetail()
  detail.innerHTML = key + ': '
  let date = document.createElement('time')
  let dayOf = entry[key].split('T')[0]
  date.innerHTML = dayOf
  detail.appendChild(date)
  parent.appendChild(detail)
  return 1
}

function span(entry, key, parent) {
  let detail = makeDetail()
  detail.innerHTML = key + ': '
  let span = document.createElement('span')
  span.innerHTML = entry[key]
  detail.appendChild(span)
  parent.appendChild(detail)
  return 1
}

function prettyLink(entry, key, parent) {
  let links = entry[key].split(', ')
  links.forEach(c => {
    let detail = makeDetail()
    let link = document.createElement('a')
    link.setAttribute('href', c)
    if (key === '_Other') {
      link.innerHTML = getTitle(link)
    } else {
      link.innerHTML = key
    }
    detail.appendChild(link)
    parent.appendChild(detail)
  })
  return links.length
}

// #todo sort order
function display(data) {
  let divider = ' · '
  function makeProjectEntry(a) {
    //let entry = document.createElement('li')
    let entry = document.createElement('details')
    entry.setAttribute('open', 'true') // can't be removed by setting false

    let title = document.createElement('summary')
    title.innerHTML = a['Project Title']
    entry.appendChild(title)

    let details = document.createElement('ul')

    // #next images
    let printSettings = {
      'Last Shipped': prettyDate,
      'Last Updated': prettyDate,
      'Brief': prettyLink,
      '_Other': prettyLink,
      'Inspiration': prettyLink,
      'Learn More': prettyLink,
      'Mockup': prettyLink,
      'Live': prettyLink
    }
    Object.keys(a).forEach(b => {
      if (a[b] && b.charAt(0) !== '_' || printSettings.hasOwnProperty(b)){
        let printFunction = printSettings[b] ?? span
        printFunction(a, b, details)
      } else {
        // #later allow adding + editing project information
      }
    })

    entry.appendChild(details)
    return entry
  }
  let projectsList = search(data)._showing
  
  //{ id: 'contact-information', type: 'footer', parent: document.body }
    
  let main = document.createElement('main')
  let header = document.createElement('header')
  main.appendChild(header)
  let title = document.createElement('h3')
  title.innerHTML = 'Featured Projects'
  header.appendChild(title)
  let projectList = document.createElement('section')
  projectsList.forEach(a => {
    projectList.appendChild(makeProjectEntry(a))
  })
  main.appendChild(projectList)
  document.body.appendChild(main)
}

