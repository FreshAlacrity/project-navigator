function log (...args) { console.log(alacrity.tidy(...args)) }

var stored = { test: false }
gatherData().then(data => {
  
  display(data)
  //log('\n\n' + testSearch() + '\n\n\n\n')
}) // #todo simplify

