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

use TYPO3\CMS\Core\Configuration\ExtensionConfiguration;
use TYPO3\CMS\Core\Utility\GeneralUtility;

/**
 * Plugin Reconfiguration Options
 */
$options = [
    'backend' => 'EXT:dp_theme/Resources/Private/Plugins/tx_mask/Backend/Templates/',
    'layouts_backend' => 'EXT:dp_theme/Resources/Private/Plugins/tx_mask/Backend/Layouts/',
    'partials_backend' => 'EXT:dp_theme/Resources/Private/Plugins/tx_mask/Backend/Partials/',

    'content' => 'EXT:dp_theme/Resources/Private/Plugins/tx_mask/Frontend/Templates/',
    'layouts' => 'EXT:dp_theme/Resources/Private/Plugins/tx_mask/Frontend/Layouts/',
    'partials' => 'EXT:dp_theme/Resources/Private/Plugins/tx_mask/Frontend/Partials/',
    'backendlayout_pids' => '0,1',

    'json' => 'EXT:dp_theme/Configuration/Mask/mask.json',
    'preview' => 'EXT:dp_theme/Resources/Public/Mask/',

    'loader_identifier ' => 'json-split',
    'content_elements_folder ' => 'EXT:dp_theme/Configuration/Mask/Frontend',
    'backend_layouts_folder  ' => 'EXT:dp_theme/Configuration/Mask/Backend'
];
/**
 * Update Plugin Configs
 */
$temporaryDirectory = GeneralUtility::makeInstance(ExtensionConfiguration::class);
$temporaryDirectory->set('mask', $options);
$GLOBALS['TYPO3_CONF_VARS']['EXTENSIONS']['mask'] = $options;
