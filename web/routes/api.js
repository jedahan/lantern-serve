'use strict'

const fs = require('fs-extra')
const exec = require('child_process').exec
const directoryTree = require('directory-tree')
const path = require('path')
const util = require('../util')
const log = util.Logger

// ----------------------------------------------------------------------
module.exports = (serv) => {
  let appsDir = path.join(__dirname, '..', '..', 'apps')

  /**
    *  Retrieves available applications from this server
    */
  serv.get('/api/apps', (req, res) => {
    if (!fs.existsSync(appsDir)) {
      return res.status(412).json({
        'ok': false, 'message': 'Missing apps directory'
      })
    }

    let filteredTree = directoryTree(appsDir, { extensions: /\.(html|js|json|css|png|gif|jpg|jpeg)$/ })

    let finalResult = []

    util.removeMeta(filteredTree, 'path')
    let result = (filteredTree.hasOwnProperty('children') ? filteredTree.children : [])

    result.forEach((app) => {
      if (app.name[0] !== '.') {
        finalResult.push(app)
      }
    })
    res.status(200).json(finalResult)
  })

  /**
    * Update to latest version of apps from git repository
    */
  serv.post('/api/apps', (req, res) => {
    exec('cd ' + appsDir + '; git pull;', (err, stdout, stderr) => {
      if (err) {
        log.error('git pull for apps: ', err)
        res.status(500).json({ 'ok': false })
      } else if (stderr) {
        log.error('git pull for apps: ', stderr)
        res.status(500).json({ 'ok': false })
      } else {
        res.status(201).json({ 'ok': true })
        log.info('git pull for apps: ', stdout)
      }
    })
  })
}
