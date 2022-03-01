// #todo sort order
function display(data) {
  let divider = ' · '
  function makeProjectEntry(a) {
    let str = a['Project Title']
    // #next print out all unused properties
    return str
  }
  let projectsList = search(data)._showing
  let pageElements = [
      { 
        id: 'page-header', 
        type: 'header'
      },{ 
        id: 'project-list', 
        type: 'section',
        html: `<h3>Featured Projects</h3>
        <ul><li>${projectsList.map(makeProjectEntry).join('</li><li>')}</li></ul>`
      }
    //{ id: 'contact-information', type: 'footer', parent: document.body }
    ]
  pageElements.forEach(e => {
    let element = document.createElement(e.type)
    pageElements.element = element
    element.setAttribute('id', e.id)
    if (e.html) {
      element.innerHTML = e.html
    }
    document.body.appendChild(element)
  })
}

