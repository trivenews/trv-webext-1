'use strict'

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'
process.env.PUBLIC_URL = './'

const argv = require('minimist')(process.argv.slice(2))
if (argv.debug) {
  process.env.DEBUG_MODE = true
}

// Browser targets
const browsers = ['chrome'];
if (argv.devbuild) {
  process.env.DEV_BUILD = true;
} else {
  browsers.push('firefox');
  browsers.push('opera');
  browsers.push('edge');
}

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err
})

// Ensure environment variables are read.
require('../config/env')

const path = require('path')
const chalk = require('chalk')
const fs = require('fs-extra')
const webpack = require('webpack')
const config = require('../config/webpack.config.prod')
const configDevBuild = require('../config/webpack.config.devbuild');
const chokidar = require('chokidar');

const paths = require('../config/paths')
// const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles')
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages')
const FileSizeReporter = require('react-dev-utils/FileSizeReporter')
const printBuildError = require('react-dev-utils/printBuildError')
// const semver = require('semver')
// var postcss = require('postcss')
// var increaseSpecificity = require('postcss-increase-specificity')



// Browser targets
/* const browsers = fs.readdirSync(path.join(__dirname, '../src/manifest'))
  .map(name => {
    const res = /^(\S+)\.manifest\.json$/.exec(name)
    return res ? res[1] : null
  })
  .filter(name => name && name !== 'common') */

const measureFileSizesBeforeBuild =
  FileSizeReporter.measureFileSizesBeforeBuild
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild
// const useYarn = fs.existsSync(paths.yarnLockFile)

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024

const browserDevBuild = ['chrome', 'opera', 'firefox', 'edge'].find(name => argv[name] === true) || 'chrome';

const appBuildPath = path.join(paths.appBuild, browserDevBuild);

if (argv.devbuild) {
  // First, read the current file sizes in build directory.
  // This lets us display how much they changed later.
  measureFileSizesBeforeBuild(appBuildPath).then(previousFileSizes => {
    // Remove all content but keep the directory so that
    // if you're in it, you don't end up in Trash
    fs.emptyDirSync(appBuildPath);

    Promise.all([copyAssets(), generateManifest()]).then(() => {
      watchAssets();
      watchManifest();
    });

    // Start the webpack build
    return watchAndBuild(previousFileSizes);
  });
} else {
  // First, read the current file sizes in build directory.
  // This lets us display how much they changed later.
  measureFileSizesBeforeBuild(paths.appBuild)
    .then(previousFileSizes => {
      // Remove all content but keep the directory so that
      // if you're in it, you don't end up in Trash
      fs.emptyDirSync(paths.appBuild)
      // Start the webpack build
      return build(previousFileSizes)
    })
    .then(
      ({
        stats,
        previousFileSizes,
        warnings
      }) => {
        if (warnings.length) {
          console.log(chalk.yellow('Compiled with warnings.\n'))
          console.log(warnings.join('\n\n'))
          console.log(
            '\nSearch for the ' +
            chalk.underline(chalk.yellow('keywords')) +
            ' to learn more about each warning.'
          )
          console.log(
            'To ignore, add ' +
            chalk.cyan('// eslint-disable-next-line') +
            ' to the line before.\n'
          )
        } else {
          console.log(chalk.green('Compiled successfully.\n'))
        }

        console.log('File sizes after gzip:\n')
        printFileSizesAfterBuild(
          stats,
          previousFileSizes,
          // only show the basename
          '[browser]/', // paths.appBuild,
          WARN_AFTER_BUNDLE_GZIP_SIZE,
          WARN_AFTER_CHUNK_GZIP_SIZE
        )
        console.log()
      },
      err => {
        console.log(chalk.red('Failed to compile.\n'))
        printBuildError(err)
        process.exit(1)
      }
    )
    .then(generateByBrowser)

}


// Create the production build and print the deployment instructions.
function build(previousFileSizes) {
  console.log('Creating an optimized production build...')

  let compiler = webpack(config)
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err)
      }
      const messages = formatWebpackMessages(stats.toJson({}, true))
      if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
          messages.errors.length = 1
        }
        return reject(new Error(messages.errors.join('\n\n')))
      }
      if (
        process.env.CI &&
        (typeof process.env.CI !== 'string' ||
          process.env.CI.toLowerCase() !== 'false') &&
        messages.warnings.length
      ) {
        console.log(
          chalk.yellow(
            '\nTreating warnings as errors because process.env.CI = true.\n' +
            'Most CI servers set it automatically.\n'
          )
        )
        return reject(new Error(messages.warnings.join('\n\n')))
      }
      return resolve({
        stats,
        previousFileSizes,
        warnings: messages.warnings,
      })
    })
  })
}

// Generate results for all browsers
function generateByBrowser() {
  const commonManifest = require('../src/manifest/common.manifest.json')
  const version = {
    version: require('../package.json').version
  }

  // Auto update description based on package.json
  const description = {
    description: require('../package.json').description
  }
  const files = fs.readdirSync(paths.appBuild)
    .map(name => ({
      name,
      path: path.join(paths.appBuild, name)
    }))

  // const localesJSON = genLocales()

  return Promise.all(browsers.map(browser => {
    const dest = path.join(paths.appBuild, browser)
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest)
    }

    const browserManifest = require(`../src/manifest/${browser}.manifest.json`)

    return Promise.all([
      // manifest
      fs.writeJson(
        path.join(dest, 'manifest.json'),
        Object.assign({}, commonManifest, browserManifest, version, description), {
          spaces: 2
        },
      ),
      // locales
      // writeLocales(path.join(dest, '_locales'), localesJSON),
      // public assets
      fs.copy(paths.appPublic, dest, {
        dereference: true,
        // ignore files or dirs start with "."
        filter: file => !/[\\\/]+\./.test(file),
      }),
      // project files
      ...files.map(file => fs.copy(file.path, path.join(dest, file.name)))
    ])
  })).then(() => Promise.all(files.map(file =>
    // clean up files
    fs.remove(file.path)
  )))
}

// Create the production build and print the deployment instructions.
function watchAndBuild(previousFileSizes) {
  console.log(`Creating an development build for ${browserDevBuild}...`);

  let compiler = webpack(configDevBuild);

  compiler.watch({
      ignored: /node_modules/,
    },
    (err, stats) => {
      if (err) {
        return printBuildError(err);
      }
      const messages = formatWebpackMessages(stats.toJson({}, true));
      if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return printBuildError(messages.errors.join('\n\n'));
      }

      if (messages.warnings.length) {
        console.log(chalk.yellow('Compiled with warnings.\n'));
        console.log(messages.warnings.join('\n\n'));
        console.log(
          '\nSearch for the ' + chalk.underline(chalk.yellow('keywords')) + ' to learn more about each warning.',
        );
        console.log('To ignore, add ' + chalk.cyan('// eslint-disable-next-line') + ' to the line before.\n');
      } else {
        console.log(chalk.green('Compiled successfully.\n'));
      }

      console.log('File sizes after gzip:\n');
      printFileSizesAfterBuild(
        stats,
        previousFileSizes,
        // only show the basename
        browserDevBuild + '/', // paths.appBuild,
        WARN_AFTER_BUNDLE_GZIP_SIZE,
        WARN_AFTER_CHUNK_GZIP_SIZE,
      );
      console.log();
    },
  );
}

function watchAssets() {
  chokidar

    .watch(path.join(__dirname, '../public'), {
      ignoreInitial: true,
    })
    .on('all', copyAssets);
}

function copyAssets() {
  return fs
    .copy(paths.appPublic, appBuildPath, {
      dereference: true,
      // ignore files or dirs start with "."
      filter: file => !/[\\\/]+\./.test(file),
    })
    .then(() => {
      console.log(chalk.green('Assets copied\n'));
    });
}

function watchManifest() {
  chokidar

    .watch(path.join(__dirname, '../src/manifest'), {
      ignoreInitial: true,
    })
    .on('all', generateManifest);
}

function generateManifest() {
  return Promise.all([
      fs.readJson(require.resolve('../src/manifest/common.manifest.json')),
      fs.readJson(require.resolve(`../src/manifest/${browserDevBuild}.manifest.json`)),
    ])
    .then(([commonManifest, browserManifest]) => {
      const version = require('../package.json').version;

      fs.writeJson(
        path.join(appBuildPath, 'manifest.json'),
        Object.assign({}, commonManifest, browserManifest, {
          version,
        }), {
          spaces: 2,
        },
      );
    })
    .then(() => {
      console.log(chalk.green('Manifest generated\n'));
    });
}



/* function writeLocales(localesPath, localesJSON) {
  const locales = Object.keys(localesJSON)
  return fs.mkdir(localesPath)
    .then(() =>
      Promise.all(locales.map(lang => {
        const langPath = path.join(localesPath, lang)
        return fs.mkdir(langPath)
          .then(() => fs.writeFile(path.join(langPath, 'messages.json'), JSON.stringify(localesJSON[lang], null, '  ')))
      }))
    )
} */

/* function patchInternalCSS() {
  const cssPath = path.join(paths.appBuild, 'panel-internal.css')
  const panelCSS = fs.readFileSync(cssPath, 'utf8')
  const output = postcss([
    increaseSpecificity({
      repeat: 1,
      overrideIds: false,
      stackableRoot: '.panel-StyleRoot'
    })
  ])
    .process(panelCSS)
    .css

  fs.writeFileSync(cssPath, output)
}
 */
