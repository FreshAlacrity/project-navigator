function log (...args) { console.log(alacrity.tidy(...args)) }

var stored = { test: false }
gatherData().then(data => {
  display(data)
  // debug
  //testSearch()
}) // #todo simplify

