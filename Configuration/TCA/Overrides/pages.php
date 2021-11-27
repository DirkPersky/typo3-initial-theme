<?php
/*
 * Copyright (c) 2021.
 *
 * @category TYPO3
 *
 * @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */

defined('TYPO3_MODE') || die();

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

// Add Plugin Configs
ExtensionManagementUtility::registerPageTSConfigFile('dp_theme', 'Configuration/TSconfig/config.tsconfig', 'DPTheme');