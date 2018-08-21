const fs = require('fs')
const path = require('path')
const archiver = require('archiver')
const { name, version } = require('../package.json');
console.log(version);
pack('chrome')
pack('firefox')
packSource()

function pack(browser) {
  return new Promise((resolve, reject) => {
    var output = fs.createWriteStream(path.join(__dirname, `../dist/${name}_${browser}_v${version}.zip`))
    var archive = archiver('zip', {})

    output.on('close', resolve)

    archive.on('warning', function (err) {
      if (err.code === 'ENOENT') {
        console.warn(err)
      } else {
        reject(err)
      }
    })

    archive.on('error', reject)

    archive.pipe(output)

    fs.readdirSync(path.join(__dirname, `../build/${browser}`))
      .filter(name => !name.endsWith('.map'))
      .forEach(name => {
        const filePath = path.join(__dirname, `../build/${browser}/`, name)
        const stats = fs.lstatSync(filePath)
        if (stats.isDirectory()) {
          archive.directory(filePath, name)
        } else if (stats.isFile()) {
          archive.file(filePath, { name })
        }
      })

    archive.finalize()
  })
}

function packSource() {
  return new Promise((resolve, reject) => {
    var output = fs.createWriteStream(path.join(__dirname, `../dist/${name}_${version}_source.zip`))
    var archive = archiver('zip', {})

    output.on('close', resolve)

    archive.on('warning', function (err) {
      if (err.code === 'ENOENT') {
        console.warn(err)
      } else {
        reject(err)
      }
    })

    archive.on('error', reject)

    archive.pipe(output)

    fs.readdirSync(path.join(__dirname, `..`))
      .filter(name => !/^(\.github|dist|node_modules|\.git)$/.test(name))
      .forEach(name => {
        const filePath = path.join(__dirname, `../`, name)
        const stats = fs.lstatSync(filePath)
        if (stats.isDirectory()) {
          archive.directory(filePath, name)
        } else if (stats.isFile()) {
          archive.file(filePath, { name })
        }
      })

    archive.finalize()
  })
}
