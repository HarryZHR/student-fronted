import axios from 'axios'

let config = require('../../config/dev.env')
let rootUrl = config.API_DOMAIN

export const instance = axios

export const StudentResource = `${rootUrl}v1/student`
export const TeacherResource = `${rootUrl}v1/teacher`
export const ClazzResource = `${rootUrl}v1/clazz`
