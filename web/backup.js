/**
* Backup and Restore
*
* Each server may be configured to make a backup using its own filesystem
* or network solution such as S3 or Manta
**/
const fs = require('fs-extra')
const path = require('path')
const util = require('./util')
const spawnSync = require('child_process').spawnSync
const log = util.Logger

// ----------------------------------------------------------------------
module.exports = (dbPath) => {
    const backFn = () => {
        if (process.env.hasOwnProperty('HOOK_BACKUP')) {
            let bin = path.resolve(process.env.HOOK_BACKUP)
            let result = spawnSync(bin, [dbPath])
            // log.debug("backup result: ", result.stdout.toString());
        }
    }

    if (!fs.existsSync(dbPath + '/!')) {
        if (process.env.hasOwnProperty('HOOK_RESTORE')) {
            let bin = path.resolve(process.env.HOOK_RESTORE)
            let result = spawnSync(bin, [dbPath])
            // log.debug("restore result: ", result.stdout.toString());
        }
    } else {
        backFn()
    }

    setTimeout(backFn, 60 * 1000)
    return Promise.resolve()
}
