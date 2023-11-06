<?php
/*
 * Copyright (c) 2023
 *
 * @copyright  2023 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */
defined('TYPO3') || die();

use TYPO3\CMS\Core\Configuration\ExtensionConfiguration;
use TYPO3\CMS\Core\Utility\GeneralUtility;

if(class_exists(\Passionweb\AiSeoHelper\Service\JavaScriptModuleService::class)) {
    /**
     * Plugin Reconfiguration Options
     */
    $options = [
        'openAiPromptPrefixPageTitle' => 'Suggest page title ideas with a maximum 60 characters in bullet point list for',
        'openAiPromptPrefixMetaDescription' => 'Extract five seo meta descriptions in a bullet point list, each seo meta description in maximum of two short sentence and with a minimum of 170 and a maximum of 200 characters for the content of'
    ];

    $newOptionsm = array_merge($GLOBALS['TYPO3_CONF_VARS']['EXTENSIONS']['ai_seo_helper'], $options);
    /**
     * Update Plugin Configs
     */
    $temporaryDirectory = GeneralUtility::makeInstance(ExtensionConfiguration::class);
    $temporaryDirectory->set('ai_seo_helper', $newOptionsm);
    $GLOBALS['TYPO3_CONF_VARS']['EXTENSIONS']['ai_seo_helper'] = $newOptionsm;
}