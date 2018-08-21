# Trive companion Web-Extension

[![Build Status](https://travis-ci.org/devkabiir/trv-webext.svg)](https://travis-ci.org/devkabiir/trv-webext)
[![Dependencies](https://img.shields.io/david/devkabiir/trv-webext.svg)](https://david-dm.org/devkabiir/trv-webext)
[![DevDependencies](https://img.shields.io/david/dev/devkabiir/trv-webext.svg)](https://david-dm.org/devkabiir/trv-webext#info=devDependencies)

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-brightgreen.svg)](https://conventionalcommits.org)
[![Airbnb TypeScript Style Guide](https://img.shields.io/badge/code_style-airbnb-brightgreen.svg)](https://github.com/progre/tslint-config-airbnb/#readme)

## Developing

1. Install deps `yarn install`
2. Run `yarn start` to work on the pop-up page

   - The `popup` page laods by default. If you need to change to other entry, `options` page for example, run `yarn start --main=options`.
   - The `background` script is always loaded (if exist).
   - Edit `config/fake-env/fake-ajax` to fake ajax calls.

3. Run `yarn start-content` to work on the content script

## Building

- Run `yarn build` to build.
  - Outputs for all browsers in `build\{browser}` directory, respectively.
  - Run `yarn release` before building to get the updated version number.
- [WIP] `yarn devbuild` for building without compression, with file watching.
  - Defaults to `chrome`. For other browser, e.g. Firefox, run `yarn devbuild --firefox`.
  - Corresponding manifest file must exist in `manifest` directory, e.g. `opera.manifest.json`
- Append `--debug` to enable `process.env.DEBUG_MODE`.
- Use `yarn zip` to create packages for all browsers

## Testing

- To test, run `yarn test` for Jest testing.
  - Run `yarn test --coverage` to collect coverage.

## Git

- Run `yarn commit` to commit with [conventional](https://conventionalcommits.org) commit style. You can also use [vscode-commitizen](https://github.com/KnisterPeter/vscode-commitizen) extension in VSCode.
- Run `yarn release` to bump version (auto-calculated) and update CHANGELOG.
