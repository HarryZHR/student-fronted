let config = require('../../config')
let rootUrl = config.dev.PREFIX_API
console.log('rootUrl:' + rootUrl)

export const getStudent = `${rootUrl}v1/student`
