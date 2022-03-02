function updateUrl(paramsObj = {}) {
  // #later check to make sure there's no '#' in any of the paramsObj values
  let params = new URLSearchParams(window.location.search)
  for (const [key, value] of Object.entries(paramsObj)) {
    if (value !== '') {
      params.set(key, value)
    } else {
      params.delete(key)
    }
  }
  let newUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`
  // #later learn how/where the state information (here {}) can be accessed
  window.history.replaceState({}, 'New Page Title Here #todo', newUrl)
}

function newSearch(terms = '') {
  // update page title
  // #todo set defaults
  
  log(`Searching...${terms}`)
  document.title = terms + ' | Project Navigator'
  // #later title case the search terms/make them pretty?
  // #later detect project IDs and make pretty titles for singles or lists of those
  //document.getElementById('page-title').innerText = `: ${terms}`
  updateProjectList(terms) // #todo get data
}

function getLinkTitle(link) {
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
    //log(`No link alias found for ${link.hostname} or ${link.pathname.split('/')[1]}; using ${guess}`)
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
      link.innerHTML = getLinkTitle(link)
    } else {
      link.innerHTML = key
    }
    detail.appendChild(link)
    parent.appendChild(detail)
  })
  return links.length
}

function makeSearchElement() {
  // see https://stackoverflow.com/questions/4509761/whats-the-best-semantic-way-to-wrap-a-search-area/4509828
  /*
    <section role="search">
      <form action="#" method="get">
          <fieldset>
              <legend>Search this website:</legend>
              <label for="s">
                  <input type="search" name="s" id="s" placeholder="Search..." maxlength="200" />
              </label>
              <button type="submit" title="Search this website now">Submit</button>
          </fieldset>
      </form>
    </section>
  */
  let searchBar = document.createElement('section')
  searchBar.setAttribute('role', 'search')
  searchBar.setAttribute('class', 'search')

  let searchForm = document.createElement('form')
  searchForm.setAttribute('action', '#')
  // ^ automatically updates the url
  searchForm.setAttribute('method', 'get')
  searchBar.appendChild(searchForm)

  let searchFieldset = document.createElement('fieldset')
  searchForm.appendChild(searchFieldset)

  let searchLegend = document.createElement('legend')
  searchLegend.innerHTML = 'Search Projects:'
  searchFieldset.appendChild(searchLegend)

  let searchLabel = document.createElement('label')
  searchLabel.setAttribute('for', 's')
  searchFieldset.appendChild(searchLabel)

  let searchInput = document.createElement('input')
  searchInput.setAttribute('type', 'search')
  searchInput.setAttribute('name', 's')
  searchInput.setAttribute('id', 's')
  searchInput.setAttribute('placeholder', 'Search...')
  let searchTerms = new URLSearchParams(window.location.search).get('s')
  if (searchTerms) { searchInput.setAttribute('value', searchTerms) }
  searchLabel.appendChild(searchInput)

  let searchButton = document.createElement('button')
  searchButton.setAttribute('type', 'submit')
  searchButton.setAttribute('title', 'Search Now')
  searchButton.innerText = 'Search'
  searchFieldset.appendChild(searchButton)

  searchInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
      // catch enter and update URL
      updateUrl({ s: searchInput.value })
    }
    newSearch(searchInput.value)
  })

  searchInput.addEventListener('click', (event) => {
    // detect 'x' button press
    if (searchInput.value === '') {
      updateUrl({ s: '' })
      newSearch(searchInput.value)
    }
  })
  
  //searchButton.addEventListener('click', (event) => {  })
  searchForm.addEventListener('submit', (event) => {
    //newSearch(event)
    updateUrl({ s: searchInput.value })
    newSearch(searchInput.value)
    //event.preventDefault()
    // prevent the page reloading: (also stops url from changing the usual way)
    event.returnValue = false // alternatively, just return false
  })
  return searchBar
}

function makeProjectEntry(a, open = false) {
  //let entry = document.createElement('li')
  let entry = document.createElement('details')

  if (open) {
    entry.setAttribute('open', 'true') // can't be removed by setting false
  }

  let title = document.createElement('summary')
  title.setAttribute('class', 'project-title')
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

function updateProjectList(searchTerms = '') {
  let projectsArr = search(stored, searchTerms)._showing
  let projectList = document.createElement('main')
  let open = (projectsArr.length < 3) // #later tweak this
  projectsArr.forEach(a => {
    projectList.appendChild(makeProjectEntry(a, open))
  })
  let previous = document.getElementById('project-list-container')
  document.getElementById('page').appendChild(projectList, previous)
  return true
}

function display(data) {
  //let divider = ' · '

  stored = data // supports current project update function

  let page = document.createElement('div')
  page.setAttribute('id', 'page')
  document.body.appendChild(page)

  let header = document.createElement('header')
  page.appendChild(header)

  let title = document.createElement('h1')
  title.setAttribute('id', 'page-title')
  title.innerText = 'FreshAlacrity | Projects'
  header.appendChild(title)

  header.appendChild(makeSearchElement())

  let main = document.createElement('main')
  main.setAttribute('id', 'project-list-container')
  page.appendChild(main)

  //{ id: 'contact-information', type: 'footer', parent: document.body }
  
  // must be after 'project-list-container' element is properly added to the page:
  newSearch(new URLSearchParams(window.location.search).get('s'))
}

