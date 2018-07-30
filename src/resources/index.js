let config = require('../../config/dev.env')
let rootUrl = config.API_DOMAIN

export const getStudent = `${rootUrl}v1/student`
