function idToTitle(source, string) {
  // #todo account for merged IDs as well
  for (const [id, entry] of Object.entries(source.data.by_ID)) {
    string = string.replaceAll(id, entry[source.name])
  }
  return string
}

function newSearch(terms = '') {
  let source = getSource()
  //log(`Searching...${terms}`)
  if (!terms) {
    document.title = 'FreshAlacrity | Project Navigator'
  } else {
    document.title = idToTitle(source, terms) + ' | Project Navigator'
  }
  // #later detect project IDs + sub in project titles
  //document.getElementById('page-title').innerText = `: ${terms}`
  updateProjectList(source, terms) // #todo get data
}

function newUrl(paramsObj = {}) {
  // #later check to make sure there's no '#' in any of the paramsObj values
  let params = new URLSearchParams(window.location.search)
  for (const [key, value] of Object.entries(paramsObj)) {
    if (value !== '') {
      params.set(key, value)
    } else {
      params.delete(key)
    }
  }
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`
}

function updateUrl(paramsObj = {}) {
  // #later learn how/where the state information (here {}) can be accessed
  window.history.replaceState({}, 'New Page Title Here #todo', newUrl(paramsObj))
}

function getLinkTitle(link) {
  let aliases = {
    'github.com':'GitHub',
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

function emptyProject() {
  let blankProject = {}
  globalStorage._projects_list_headers.forEach(h => {
    blankProject[h] = '+'
  })
  // #todo fix links showing up oddly
  // give it a fresh ID for the session?
  return blankProject
}

function makeProjectEntry(a, open = false, source) {
  //let entry = document.createElement('li')
  let entry = document.createElement('details')

  // note - this can't be removed by setting open to false:
  if (open) { entry.setAttribute('open', 'true') }

  let title = document.createElement('summary')
  title.setAttribute('class', 'project-title')
  title.innerHTML = a['Project Title']
  entry.appendChild(title)

  let details = document.createElement('ul')

  // #next start set up to adding + editing project information
  // #todo put all links on one line
  // #todo add support for images (.png .jpg .jpeg)
  // #todo add date formatting with Luxon (and format string to source.date_format)
  // #later detect data format in merge step and add a key to which properties should be displayed in different ways to the source object; include datalist types for limited options
  /* via https://stackoverflow.com/a/31016229/2735578
    <label>Choose a browser from this list:
    <input list="browsers" name="myBrowser" /></label>
    <datalist id="browsers">
      <option value="Chrome">
      <option value="Firefox">
      <option value="Internet Explorer">
      <option value="Opera">
      <option value="Safari">
      <option value="Microsoft Edge">
    </datalist>
  // #later add support for adding project IDs to a list of IDs by searching name + alias from input until only one project matches input
  */

  function span(entry, key, parent) {
    let detail = makeDetail()
    detail.innerHTML = key + ': '
    let span = document.createElement('span')
    if (key != source.id) {
      span.innerHTML = idToTitle(source, entry[key])
    } else {
      // #later change this to say 'Permalink' and offer permalink to project:
      span.innerHTML = entry[key] 
    }
    detail.appendChild(span)
    parent.appendChild(detail)
    return 1
  }

  function val(entry, key, parent) {
    let fill = '☆✭★'
    let detail = makeDetail()
    detail.innerHTML = key + ': '
    let span = document.createElement('span')
    let n = entry[key]
    if (n === Math.floor(n)) {
      if (n >= 0 && n <= 10) {
        span.innerHTML = '★'.repeat(Math.floor(Math.abs(n/2))) + '☆'.repeat(5 - Math.floor(Math.abs(n/2)))
      } else {
        span.innerHTML = n
      }
    } else if (typeof n === 'number') {
      span.innerHTML = Math.floor(n * 100) + '%'
    } else if (n === true) {
      span.innerHTML = '<input type="checkbox" checked>'
    } else if (n === false) {
      span.innerHTML = '<input type="checkbox">'
    } else {  
      span.innerHTML = n
    }
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

  Object.keys(a).forEach(property => {
    let printFunction = span
    if (typeof a[property] === 'string') {
      if (a[property].slice(0, 4) === 'http') {
        printFunction = prettyLink
      }
    } else {
      printFunction = val
    }
    printFunction(a, property, details)
  })

  entry.appendChild(details)
  return entry
}

function updateProjectList(source, searchTerms = '') {


  let previous = document.getElementById('project-list-container')

  let projectList = document.createElement('main')
  projectList.setAttribute('id', 'project-list-container')

  let projectsArr = search(source, searchTerms).showing
  let open = (projectsArr.length < 3) // #later tweak this to take project entry length into account
  projectsArr.forEach(a => {
    projectList.appendChild(makeProjectEntry(a, open, source))
  })
  // #todo make this conditional on edit mode:
  //projectList.appendChild(makeProjectEntry(emptyProject(), false))
  // #todo add a 'New Project' closed entry at the bottom of the list with a title of New Project (or the current search term if there aren't any matches?)

  document.getElementById('page').replaceChild(projectList, previous)
  return true
}

function makeId() {
  return (Math.floor(Math.random()*4294967295)).toString(16).toUpperCase()
}

function addNew(input) {
  alert(`Adding new project! ${input}`)
  // #todo check if the project exists

  // #todo add the new project
  let projectObj = emptyProject()
  projectObj['Project Title'] = input
  projectObj['Project ID'] = makeId()
  
  // add the new entry to the right places
  globalStorage[globalStorage._current_type]._list.push(projectObj)
  globalStorage[globalStorage._current_type]._by_ID[projectObj['Project ID']] = projectObj
  globalStorage[globalStorage._current_type]._by_title[input] = projectObj['Project ID']
  
  // #todo save to the sheet


  newSearch(projectObj['Project ID'])
}

function display(source) {
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
    // point the form submit action to this page
    searchForm.setAttribute('action', '#')
    // append the form data to the url
    searchForm.setAttribute('method', 'get')
    // disable the browser's autocomplete so we can use our own
    searchForm.setAttribute('autocomplete', 'off')
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

     // #todo make this conditional on edit mode:
    let addNewButton = document.createElement('button')
    addNewButton.setAttribute('type', 'submit')
    addNewButton.setAttribute('title', 'Add New')
    addNewButton.innerText = 'Add'
    searchFieldset.appendChild(addNewButton)

    addNewButton.addEventListener('click', (event) => {
      addNew(searchInput.value)
    })

    searchInput.addEventListener('keyup', (event) => {
      // #todo catch 'tab' and sub in autocomplete
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
      event.returnValue = false // alternatively, just return false
      updateUrl({ s: searchInput.value })
      newSearch(searchInput.value)
      //event.preventDefault()
      // prevent the page reloading: (also stops url from changing the usual way)
    })
    return searchBar
  }

  //let divider = ' · '

  let page = document.createElement('div')
  page.setAttribute('id', 'page')
  document.body.appendChild(page)

  let header = document.createElement('header')
  page.appendChild(header)

  let title = document.createElement('h1')
  title.setAttribute('id', 'page-title')

  // #later make it so these don't reload the page?
  let homeLink = document.createElement('a')
  // link to home project ('About Me')
  homeLink.setAttribute('id', 'now-showing')
  homeLink.setAttribute('href', newUrl({ s: source.about_id }))
  homeLink.innerText = 'FreshAlacrity'
  title.appendChild(homeLink)

  let titleText = document.createElement('span')
  titleText.innerText = ' | '
  title.appendChild(titleText)

  let allLink = document.createElement('a')
  allLink.setAttribute('href', newUrl({ s: '' }))
  allLink.innerText = 'Projects'
  title.appendChild(allLink)

  header.appendChild(title)

  header.appendChild(makeSearchElement())

  let main = document.createElement('main')
  main.setAttribute('id', 'project-list-container')
  page.appendChild(main)

  //{ id: 'contact-information', type: 'footer', parent: document.body }
  
  // must be after 'project-list-container' element is properly added to the page:
  newSearch(new URLSearchParams(window.location.search).get('s') ?? '')
}

