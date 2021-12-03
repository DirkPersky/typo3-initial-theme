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
    // WebP Handling
    $GLOBALS['TYPO3_CONF_VARS']['GFX']['gdlib'] = true;
    $GLOBALS['TYPO3_CONF_VARS']['GFX']['imagefile_ext'] = 'gif,jpg,jpeg,tif,tiff,bmp,pcx,tga,png,pdf,ai,svg,webp';
    // Remove Chash for news
    $GLOBALS['TYPO3_CONF_VARS']['FE']['cacheHash']['excludedParameters'] = array_merge(
        $GLOBALS['TYPO3_CONF_VARS']['FE']['cacheHash']['excludedParameters'],
        [
            'tx_news_pi1[@widget_0][currentPage]'
        ]
    );
    // overwrite Container to add Flexforms
    $GLOBALS['TYPO3_CONF_VARS']['SYS']['Objects'][\B13\Container\Tca\ContainerConfiguration::class] = [
        'className' => \DirkPersky\Theme\Tca\ContainerConfiguration::class
    ];
    // overwrite Registry to add Flexforms
    $GLOBALS['TYPO3_CONF_VARS']['SYS']['Objects'][\B13\Container\Tca\Registry::class] = [
        'className' => \DirkPersky\Theme\Tca\Registry::class
    ];

}, 'dp_theme');

