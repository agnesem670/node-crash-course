//const abc = require('./people')
//console.log(abc.people, abc.ages)
const { people, ages } = require('./people')
console.log(people, ages)

const os = require('os')
console.log(os)
console.log(os.platform(), os.homedir())
