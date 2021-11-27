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

defined('TYPO3_MODE') or die();


call_user_func(function ($ext_key) {
# Check if ext:personnel is loaded and add TS constant
//    $manager = GeneralUtility::makeInstance(\TYPO3\CMS\Core\Package\PackageManager::class);
//    echo '<pre>';
//    var_dump(get_class_methods($manager));
//die();
    if (TYPO3\CMS\Core\Utility\ExtensionManagementUtility::isLoaded($ext_key)) {
//        die('loaded');
    }

    $GLOBALS['TYPO3_CONF_VARS']['BE']['debug'] = true;
    $GLOBALS['TYPO3_CONF_VARS']['SYS']['displayErrors'] = 1;
    $GLOBALS['TYPO3_CONF_VARS']['SYS']['devIPmask'] = '*';
    $GLOBALS['TYPO3_CONF_VARS']['SYS']['errorHandler'] = 'TYPO3\CMS\Core\Error\ErrorHandler';
    $GLOBALS['TYPO3_CONF_VARS']['SYS']['errorHandlerErrors'] = E_ALL ^ E_NOTICE;
    $GLOBALS['TYPO3_CONF_VARS']['SYS']['exceptionalErrors'] = E_ALL ^ E_NOTICE ^ E_WARNING ^ E_USER_ERROR ^ E_USER_NOTICE ^ E_USER_WARNING;
    $GLOBALS['TYPO3_CONF_VARS']['SYS']['debugExceptionHandler'] = 'TYPO3\CMS\Core\Error\DebugExceptionHandler';
    $GLOBALS['TYPO3_CONF_VARS']['SYS']['productionExceptionHandler'] = 'TYPO3\CMS\Core\Error\ProductionExceptionHandler';
    $GLOBALS['TYPO3_CONF_VARS']['SYS']['systemLogLevel'] = '0';
    $GLOBALS['TYPO3_CONF_VARS']['SYS']['systemLog'] = 'error_log';
    $GLOBALS['TYPO3_CONF_VARS']['SYS']['enable_DLOG'] = '1';
    $GLOBALS['TYPO3_CONF_VARS']['SYS']['enable_errorDLOG'] = '1';
    $GLOBALS['TYPO3_CONF_VARS']['SYS']['enable_exceptionDLOG'] = '1';
    $GLOBALS['TYPO3_CONF_VARS']['SYS']['enableDeprecationLog'] = 'console';
    $GLOBALS['TYPO3_CONF_VARS']['SYS']['sqlDebug'] = '1';
    $GLOBALS['TYPO3_CONF_VARS']['SYS']['extCache'] = '0';

}, 'dp_theme');