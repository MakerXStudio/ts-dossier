<!--- 👇 DELETE THIS SECTION 👇 -->
# ⚠️ Attention Developers ⚠️

Steps for using the template

1. Click the 'Use this template' button in this repository
2. Check out the source code of your newly created repository
3. Run the powershell script `name-my-package.ps1`

```ps1
.\name-my-package.ps1
or
.\name-my-package.ps1 -PackageName "" -PackageTitle "" -PackageDescription ""
```

4. Delete the `name-my-package.ps1` script
5. Add the keywords to the package.json file
6. Fill in the usage section of this file
7. Review the PR, Issue bug, and Issue feature GitHub template
8. Generate a NPM token and add it as actions secret using the key `NPM_TOKEN` in the repository settings on GitHub
   1. _Note: you will need to be added to the MakerX NPM org in order to generate a token and be able to publish the package_
9. Create the wiki and add any additional documentation required
10. Promote 🎉 your package 🎉

⚠️ It's important to remember this repository uses [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) in combination with [semantic-release](https://github.com/semantic-release/semantic-release) to automate package publication. Therefore, your commit messages are critical, and the build process will lint them 

---
<!--- 👆 DELETE THIS SECTION 👆 -->

# {{package-title}} ({{package-name}})

> {{package-description}}

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

## Install

```bash
npm install {{package-name}} --save-dev
```

## Usage

** 🚨 TODO 🚨 **

_The usage section should be minimal. Enough to demo the package, but not overload the reader_


[build-img]:https://github.com/MakerXStudio/{{package-name}}/actions/workflows/release.yml/badge.svg
[build-url]:https://github.com/MakerXStudio/{{package-name}}/actions/workflows/release.yml
[downloads-img]:https://img.shields.io/npm/dt/@MakerXStudio/{{package-name}}
[downloads-url]:https://www.npmtrends.com/@makerx/{{package-name}}
[npm-img]:https://img.shields.io/npm/v/@makerx/{{package-name}}
[npm-url]:https://www.npmjs.com/package/@makerx/{{package-name}}
[issues-img]:https://img.shields.io/github/issues/MakerXStudio/{{package-name}}
[issues-url]:https://github.com/MakerXStudio/{{package-name}}/issues
[semantic-release-img]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]:https://github.com/semantic-release/semantic-release

---

**Attribution**

This template was based on the great work of [Ryan Sonshine](https://github.com/ryansonshine/typescript-npm-package-template)
