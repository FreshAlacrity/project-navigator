function search(projectsObj) {
  if (projectsObj._params.get('show')) {
    let searchTermsArr = projectsObj._params.get('show').split(' ')
    let searchResults = []
    let byId = projectsObj._projects_by_ID
    // #later maybe reserve a particular URL parameter/keyword for pulling up a specific project
    console.log(searchTermsArr)
    searchTermsArr.forEach(searchTerms => {
      // look for exact match with primary ID
      if (byId.hasOwnProperty(searchTerms)){
        searchResults.push(byId[searchTerms])
        log('ID Matched single project:\n' + byId[searchTerms]['Project Title'])
      }
    })
    // _Merged Project IDs
    projectsObj._showing = searchResults
  } else {
    // there's no search so return all projects
    projectsObj._showing = projectsObj._projects_list
  }
  return projectsObj
}