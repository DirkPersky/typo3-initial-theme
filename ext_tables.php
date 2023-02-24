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

defined('TYPO3') or die();
call_user_func(function ($ext_key) {
    /**
     * Add backend Styles
     */
    if (TYPO3 === 'BE') {
        // add css Skin
        if(!isset($GLOBALS['TBE_STYLES']['skins'][$ext_key])){
            $GLOBALS['TBE_STYLES']['skins'][$ext_key] = [
                'stylesheetDirectories' => [
                    'css' => "EXT:{$ext_key}/Resources/Public/assets/backend/css/"
                ]
            ];
        }
    }

}, 'dp_theme');