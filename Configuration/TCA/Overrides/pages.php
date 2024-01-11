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

defined('TYPO3') || die();

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

// Add Plugin Configs
ExtensionManagementUtility::registerPageTSConfigFile('dp_theme', 'Configuration/TSconfig/Layout1/config.tsconfig', 'DPTheme - Layout 1');
ExtensionManagementUtility::registerPageTSConfigFile('dp_theme', 'Configuration/TSconfig/Layout2/config.tsconfig', 'DPTheme - Layout 2');
ExtensionManagementUtility::registerPageTSConfigFile('dp_theme', 'Configuration/TSconfig/Layout3/config.tsconfig', 'DPTheme - Layout 3');
ExtensionManagementUtility::registerPageTSConfigFile('dp_theme', 'Configuration/TSconfig/Layout4/config.tsconfig', 'DPTheme - Layout 4');
ExtensionManagementUtility::registerPageTSConfigFile('dp_theme', 'Configuration/TSconfig/Layout5/config.tsconfig', 'DPTheme - Layout 5');
ExtensionManagementUtility::registerPageTSConfigFile('dp_theme', 'Configuration/TSconfig/Layout6/config.tsconfig', 'DPTheme - Layout 6');
