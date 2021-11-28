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
PUBLIC_DIR="Resources/Public"

echo "Prepare and install NPM Packages"
npm i --only=dev

echo "Run Above the Fold"
node bin/abovethefold.js "$PUBLIC_DIR"

echo "Remove all Packages"
rm -rf node_modules

echo "Above the fold is generated"