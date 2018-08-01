'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"development"',
  API_DOMAIN: 'http://localhost:8083/',
  PREFIX_API: '"api/"',
})
