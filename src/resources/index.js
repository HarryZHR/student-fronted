let config = require('../../config/dev.env')
let rootUrl = config.API_DOMAIN

export const getStudent = `${rootUrl}v1/student`
export const getTeacher = `${rootUrl}v1/teacher`
export const getClazz = `${rootUrl}v1/clazz`
