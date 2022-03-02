function search(projectsObj, searchTerms = '') {
  if (searchTerms) {
    let searchTermsArr = searchTerms.split(' ')
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
    // #todo sort order
    projectsObj._showing = searchResults
  } else {
    // there's no search so return all projects
    // #todo sort by '_Test' for now
    projectsObj._showing = projectsObj._projects_list
  }
  stored = projectsObj // supports current project update function
  return projectsObj
}