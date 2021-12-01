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
    'backend' => 'typo3conf/ext/dp_theme/Resources/Private/Plugins/tx_mask/Backend/Templates/',
    'backendlayout_pids' => '0,1',
    'content' => 'typo3conf/ext/dp_theme/Resources/Private/Plugins/tx_mask/Frontend/Templates/',
    'json' => 'typo3conf/ext/dp_theme/Configuration/Mask/mask.json',
    'layouts' => 'typo3conf/ext/dp_theme/Resources/Private/Plugins/tx_mask/Frontend/Layouts/',
    'layouts_backend' => 'typo3conf/ext/dp_theme/Resources/Private/Plugins/tx_mask/Backend/Layouts/',
    'partials' => 'typo3conf/ext/dp_theme/Resources/Private/Plugins/tx_mask/Frontend/Partials/',
    'partials_backend' => 'typo3conf/ext/dp_theme/Resources/Private/Plugins/tx_mask/Backend/Partials/',
    'preview' => 'typo3conf/ext/dp_theme/Resources/Public/Mask/',
];
/**
 * Update Plugin Configs
 */
$temporaryDirectory = GeneralUtility::makeInstance(ExtensionConfiguration::class);
$temporaryDirectory->set('mask', $options);
$GLOBALS['TYPO3_CONF_VARS']['EXTENSIONS']['mask'] = $options;
