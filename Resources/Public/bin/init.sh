#!/bin/sh

#
# Copyright (c) 2021.
#
# @category TYPO3
#
# @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
# @author     Dirk Persky <dirk.persky@gmail.com>
# @license    AGPL v3
#
echo "Clear old vendors"
rm -rf assets/vendor
rm -rf scss/vendor
rm -rf js/vendor

echo "Prepare and install NPM Packages"
npm i

echo "Copy NPM files for Working"
node bin/prepare.js

echo "Remove all Packages"
rm -rf node_modules

echo "Package is Ready to use"