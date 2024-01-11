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
ExtensionManagementUtility::addStaticFile('dp_theme', 'Configuration/TypoScript/Layout1', 'DPTheme Layout 1');
ExtensionManagementUtility::addStaticFile('dp_theme', 'Configuration/TypoScript/Layout2', 'DPTheme Layout 2');
ExtensionManagementUtility::addStaticFile('dp_theme', 'Configuration/TypoScript/Layout3', 'DPTheme Layout 3');
ExtensionManagementUtility::addStaticFile('dp_theme', 'Configuration/TypoScript/Layout4', 'DPTheme Layout 4');
ExtensionManagementUtility::addStaticFile('dp_theme', 'Configuration/TypoScript/Layout5', 'DPTheme Layout 5');
ExtensionManagementUtility::addStaticFile('dp_theme', 'Configuration/TypoScript/Layout6', 'DPTheme Layout 6');
ExtensionManagementUtility::addStaticFile('dp_theme', 'Configuration/TypoScript/Performance', 'DPTheme GoLive Configuration');
ExtensionManagementUtility::addStaticFile('dp_theme', 'Configuration/TypoScript/rss', 'DPTheme RSS (last if needed)');